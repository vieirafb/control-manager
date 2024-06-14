export default class StockMovementType {
    static readonly INFLOW: string = 'inflow';
    static readonly OUTFLOW: string = 'outflow';
    readonly value: string;

    constructor(value: string) {
        if (!this.exists(value)) throw new Error('Invalid inventory movement type');
        this.value = value;
    }

    list(): string[] {
        return [
            StockMovementType.INFLOW,
            StockMovementType.OUTFLOW,
        ];
    }

    exists(value: string): boolean {
        return this.list().indexOf(value) !== -1;
    }
}
