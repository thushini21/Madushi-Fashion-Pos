export default class OrderModel{
    constructor(orderid,customer_name,date,total) {
        this._orderid = orderid;
        this._customer_name = customer_name;
        this._date = date;
        this._total = total;
    }


    get orderid() {
        return this._orderid;
    }

    set orderid(value) {
        this._orderid = value;
    }

    get customer_name() {
        return this._customer_name;
    }

    set customer_name(value) {
        this._customer_name = value;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get total() {
        return this._total;
    }

    set total(value) {
        this._total = value;
    }
}