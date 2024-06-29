import ListQueryInput from "../../../http/queries/ListQueryInput";
import ListQueryInterface from "../../../http/queries/ListQueryInterface";

export default abstract class ListQueryAbstract implements ListQueryInterface {
    protected abstract modelFields: ModelField[];

    abstract build(input: ListQueryInput): Promise<any>;

    async handle(input: ListQueryInput): Promise<any> {
        this.map(input);
        return this.build(input);
    };

    protected map(input: ListQueryInput): void {
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
    }
}

export type ModelField = {
    name: string,
    match: string[],
    default?: boolean,
    display?: true,
    options?: {
        searchable?: boolean,
        sort?: {
            direction: 1 | -1,
            order: number,
        }
    },
};
