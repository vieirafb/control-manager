export default class Product {
    readonly id: string;
    private _name: string;
    private _type: string;
    private _price: number;
    private _stock: number;
    readonly createdAt?: Date;
    readonly updatedAt?: Date;

    constructor(
        name: string,
        type: string,
        price: number,
        stock?: number,
        id?: string,
        createdAt?: Date,
        updatedAt?: Date,
    ) {
        this.id = id || '';
        this._name = name;
        this._type = type;
        this._price = price;
        this._stock = stock || 0;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    get price(): number {
        return this._price;
    }

    set price(price: number) {
        if (price < 0) throw new Error("Price cannot be less than 0");
        this._price = price;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        if (name.trim().length < 1) throw new Error("Invalid name");
        this._name = name;
    }

    get type(): string {
        return this._type;
    }

    set type(type: string) {
        if (type.trim().length < 1) throw new Error("Invalid type");
        this._type = type;
    }

    get stock(): number {
        return this._stock;
    }

    set stock(stock: number) {
        if (stock < 0) throw new Error("Stock cannot be less than 0");
        this._stock = stock;
    }
}