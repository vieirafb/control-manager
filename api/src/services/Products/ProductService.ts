import Product from "../../models/Product";
import NotFoundError from "../../common/errors/NotFoundError";
import SaveDTO from "./DTOs/SaveDTO";
import UpdateDTO from "./DTOs/UpdateDTO";
import ListDTO from "./DTOs/ListDTO";
import { Aggregate } from "mongoose";

export default class ProductService {
    protected modelFields: any[] = [
        { name: '_id', match: ['_id', 'id'], default: false },
        { name: 'name', match: ['name'] },
        { name: 'type', match: ['type'] },
        { name: 'price', match: ['price'] },
        { name: 'stock', match: ['stock'] },
        { name: 'createdAt', match: ['createdAt'] },
        { name: 'updatedAt', match: ['updatedAt'] },
    ];

    async save(input: SaveDTO) {
        return await Product.create({
            name: input.name,
            type: input.type,
            price: input.price,
        });
    }

    async update(input: UpdateDTO): Promise<any> {
        const product = await Product.findByIdAndUpdate(input.id, {
            name: input.name,
            type: input.type,
            price: input.price,
        }, { new: true });

        if (!product) throw new NotFoundError('Product not found');

        return product;
    }

    async get(id: string) {
        const product = await Product.findById(id).exec();
        if (!product) throw new NotFoundError('Product not found');
        return product;
    }

    async getAll() {
        return await Product.find().exec();
    }

    async delete(id: string): Promise<void> {
        const response = await Product.findByIdAndDelete(id).exec();
        if (!response) throw new NotFoundError('Product not found');
    }

    async exists(id: string): Promise<boolean> {
        const existis = await Product.exists({ _id: id });
        return !!existis;
    }

    async list(input: ListDTO) {
        this.modelFields.forEach(modelField => {
            input.fields.forEach((field, key) => {
                if (!modelField.match.includes(field.data)) return;

                modelField.display = true;
                modelField.options = { searchable: field.searchable === true || field.searchable === undefined };

                if (input.sort) {
                    for (let i = 0; i < input.sort.length; i++) {
                        const sort = input.sort[i];

                        if (Number(sort.column) !== key) continue;
                        if (input.fields[key].sortable === false) continue;

                        modelField.options.sort = {
                            order: i,
                            direction: sort.direction === 'asc' || sort.direction !== 'desc' ? 1 : -1,
                        }
                    }
                }
            });
        });

        const aggregate: Aggregate<any> = Product.aggregate();
        const documentsTotal: any = await Product.aggregate().count('count');
        let documentsFiltered: any = [];

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
            .skip(Number(input.offset) || 0)
            .limit(Number(input.length) || 50);

        return {
            recordsTotal: documentsTotal[0] ? documentsTotal[0].count : 0,
            recordsFiltered: documentsFiltered[0] ? documentsFiltered[0].count : 0,
            data: await aggregate,
        };
    };

    private match(search: string, regex: boolean): any {
        const $match: any[] = [];

        for (const field of this.modelFields) {
            if (!field.options || field.options.searchable === false) continue;
            $match.push({ [field.name]: regex ? { $regex: search, $options: 'i' } : search });
        }

        return { $or: $match };
    }

    private project(): any {
        const $project: { [key: string]: number } = {};

        this.modelFields.forEach(modelField => {
            if (modelField.default !== undefined) {
                $project[modelField.name] = Number(modelField.default)
            }
            if (modelField.display) {
                $project[modelField.name] = 1
            }
        });

        return $project;
    }

    private sort(): any {
        const $sort: { [key: string]: 1 | -1 } = {};
        const fields = this.modelFields
            .filter(field => field.options && field.options.sort)
            .sort((f1, f2) =>
                f1.options && f1.options.sort && f2.options && f2.options.sort
                    ? f1.options.sort.order - f2.options.sort.order : 1
            );

        fields.forEach(field => {
            if (field.options && field.options.sort)
                $sort[field.name] = field.options.sort.direction;
        });

        if (Object.keys($sort).length > 0) return $sort;
    }
}
