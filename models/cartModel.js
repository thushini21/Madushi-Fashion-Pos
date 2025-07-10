export default class CartModel{
    constructor(itemid,qty,unitprice,total) {
        this._itemid = itemid;
        this._qty = qty;
        this._unitprice = unitprice;
        this._total = total;

    }

    get itemid() {
        return this._itemid;
    }

    set itemid(value) {
        this._itemid = value;
    }

    get qty() {
        return this._qty;
    }

    set qty(value) {
        this._qty = value;
    }

    get unitprice() {
        return this._unitprice;
    }

    set unitprice(value) {
        this._unitprice = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
}