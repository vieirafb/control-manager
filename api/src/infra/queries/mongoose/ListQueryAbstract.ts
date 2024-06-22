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
