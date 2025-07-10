export default class ItemModel{
    constructor(itemid,name,description,quantity,price,imageURL) {
        this._itemid = itemid;
        this._name = name;
        this._description = description;
        this._quantity = quantity;
        this._price = price;
        this._imageURL = imageURL;
    }

    get itemid() {
        return this._itemid;
    }

    set itemid(value) {
        this._itemid = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get imageURL() {
        return this._imageURL;
    }

    set imageURL(value) {
        this._imageURL = value;
    }
}