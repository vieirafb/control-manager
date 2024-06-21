import ListProductsQuery from "../../../domain/queries/ListProductsQuery";
import ListQueryInput from "../../../domain/queries/ListQueryInput";
import Product from "../../models/Product";
import {Aggregate} from "mongoose";

export default class ListProductsQueryMongoose implements ListProductsQuery {

    private modelFields: ModelField[] = [
        {name: '_id', match: ['_id', 'id'], default: false},
        {name: 'name', match: ['name']},
        {name: 'type', match: ['type']},
        {name: 'price', match: ['price']},
        {name: 'stock', match: ['stock']},
        {name: 'createdAt', match: ['createdAt']},
        {name: 'updatedAt', match: ['updatedAt']},
    ];

    async handle(input: ListQueryInput): Promise<any> {
        const aggregate: Aggregate<any> = Product.aggregate();
        const documentsTotal: any = await Product.aggregate().count('count');
        let documentsFiltered: any;

        this.map(input);

        aggregate.project(this.project())

        if (input.search) {
            const $match = this.match(input.search.value, input.search.regex || false);
            aggregate.match($match);
            documentsFiltered = await Product.aggregate().match($match).count('count');
        }

        if (input.sort) {
            aggregate.sort(this.sort());
        }

        aggregate
            .skip(input.offset || 0)
            .limit(input.length || 50);

        return {
            recordsTotal: documentsTotal[0] ? documentsTotal[0].count : 0,
            recordsFiltered: documentsFiltered[0] ? documentsFiltered[0].count : 0,
            data: await aggregate,
        };
    }

    private match(search: string, regex: boolean): any {
        const $match: any[] = [];

        for (const field of this.modelFields) {
            if (!field.options || field.options.searchable === false) continue;
            $match.push({[field.name]: regex ? {$regex: search, $options: 'i'} : search});
        }

        return {$or: $match};
    }

    private project(): any {
        const $project: { [key: string]: number } = {};

        this.modelFields.forEach(modelField => {
            const display = modelField.display || modelField.default;
            if (display) $project[modelField.name] = 1;
        });

        return $project;
    }

    private sort(): any {
        const $sort: { [key: string]: 1 | -1 } = {};


        this.modelFields.forEach(field => {
            if (field.options && field.options.sortDirection)
                $sort[field.name] = field.options.sortDirection;
        });

        if (Object.keys($sort).length > 0) return $sort;
    }

    private map(input: ListQueryInput): void {
        this.modelFields.forEach(modelField => {
            input.fields.forEach((field, key) => {
                if (!modelField.match.includes(field.data)) return;

                modelField.display = true;
                modelField.options = {searchable: field.searchable === true || field.searchable === undefined};

                if (input.sort) {
                    for (const sort of input.sort) {
                        if (sort.column !== key) continue;
                        if (input.fields[key].sortable === false) continue;

                        modelField.options.sortDirection =
                            sort.direction === 'asc' || sort.direction === undefined ? 1 : -1;
                    }
                }
            });
        });
    }
}

type ModelField = {
    name: string,
    match: string[],
    default?: boolean,
    display?: true,
    options?: {
        searchable?: boolean,
        sortDirection?: 1 | -1,
    },
};
