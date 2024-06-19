import DomainError from "../../errors/DomainError";

export default class Product {
    readonly id: string;
    private _name: string;
    private _type: string;
    private _price: number;
    readonly stock: number;
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
        this.stock = stock || 0;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    get price(): number {
        return this._price;
    }

    set price(price: number) {
        if (price < 0) throw new DomainError("Price cannot be less than 0");
        this._price = price;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        if (name.trim().length < 1) throw new DomainError("Invalid name");
        this._name = name;
    }

    get type(): string {
        return this._type;
    }

    set type(type: string) {
        if (type.trim().length < 1) throw new DomainError("Invalid type");
        this._type = type;
    }
}
