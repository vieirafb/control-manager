import ListProductsQuery from "../queries/ListProductsQuery";

export default class ListProducts {
    constructor(readonly productListQuery: ListProductsQuery) {}

    async execute(input: ListProductsInput) {
        return await this.productListQuery.handle(input);
    }
}

type ListProductsInput = {
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
