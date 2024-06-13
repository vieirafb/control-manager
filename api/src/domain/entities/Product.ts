export default class Product {
    constructor(
        private _name: String,
        private _type: String,
        private _price: Number,
        private _stock: Number | 0,
        readonly id?: String,
        readonly createdAt?: Date,
        readonly updatedAt?: Date,
    ) {
    }

    get price(): Number {
        return this._price;
    }

    set price(price: Number) {
        if (price < 0) throw new Error("Price cannot be less than 0");
        this._price = price;
    }

    get name(): String {
        return this._name;
    }

    set name(name: String) {
        if (name.trim().length < 1) throw new Error("Invalid name");
        this._name = name;
    }

    get type(): String {
        return this._type;
    }

    set type(type: String) {
        if (type.trim().length < 1) throw new Error("Invalid type");
        this._type = type;
    }

    get stock(): Number {
        return this._stock;
    }

    set stock(stock: Number) {
        if (stock < 0) throw new Error("Stock cannot be less than 0");
        this._stock = stock;
    }
}
