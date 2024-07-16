export default interface SaveDTO {
    productId: string
    movementType: 'inflow' | 'outflow';
    quantity: number;
    entryDatetime: string;
    comments: string;
}
