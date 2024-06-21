type ListQueryInput = {
    offset?: number,
    length?: number,
    search?: {
        value: string,
        regex?: boolean
    },
    fields: {
        data: string,
        sortable?: boolean,
        searchable?: boolean,
    }[],
    sort?: {
        column: number,
        direction?: string,
    }[],
};

export default ListQueryInput;
