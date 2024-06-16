export type ListQueryInput = {
    page: number,
    length: number,
    search: string,
    fields: Field[],
    order: Order[],
};

type Field = {
    data: string,
    sortable: boolean,
    searchable: boolean,
};

type Order = {
    column: string,
    direction: string,
};
