const dayjs = require("dayjs");

const Status = {
  initial: "initial",
  ordered: "ordered",
  cancelled: "cancelled",
  shipped: "shipped",
  delivered: "delivered",
};

const taxRate = 1.1;

class Order {
  constructor(params) {
    this.id = params.id;
    this.userId = params.userId;
    this.products = params.products;
    this.shipmentInfo = params.shipmentInfo;
    this.paymentInfo = params.paymentInfo;
    this.shipmentInfoId = params.shipmentInfoId;
    this.paymentInfoId = params.paymentInfoId;
    this.totalAmount = params.totalAmount;
    this.errors = [];
    this.state = params.state || Status.initial;
  }

  get productCodes() {
    return this.products.map((it) => it.code);
  }

  get valid() {
    return this.errors.length <= 0;
  }

  serialize(context) {
    this.withProductDetails(context);
    if (!this.shipmentInfo) {
      this.shipmentInfo = this.shipmentInfoById(context, this.shipmentInfoId)
    }

    if (!this.paymentInfo) {
      this.paymentInfo = this.paymentInfoById(context, this.paymentInfoId)
    }

    return {
      id: this.id,
      userId: this.userId,
      products: this.products,
      shipmentInfo: this.shipmentInfo,
      shipmentInfoId: this.shipmentInfo?.id,
      paymentInfo: this.paymentInfo,
      paymentInfoId: this.paymentInfo?.id,
      orederedAt: this.orderedAt,
      state: this.state,
    };
  }

  shipmentInfoById(context, id) {
    return context.shipmentInfo.find((it) => it.id === id);
  }

  paymentInfoById(context, id) {
    return context.paymentInfo.find((it) => it.id === id);
  }

  withProductDetails(context) {
    context.products.forEach((product) => {
      const target = this.products.find((it) => it.code === product.code);
      if (target && !target.product) {
        target.product = product;
      }
    });
  }

  save(context) {
    if (!this.userId) {
      this.errors.push(["base", "ユーザ情報がありません。"]);
      return;
    }

    const reducers = [];
    let totalAmount = 0;
    this.products.forEach((it) => {
      const product = context.products.find((p) => p.code === it.code);
      if (!product) {
        this.errors.push(["base", "商品が見つかりません。", { product }]);
        return;
      }

      const { color, size, amount } = it.form;
      if (product.stocks[color] && product.stocks[color][size]) {
        if (product.stocks[color][size] < amount) {
          this.errors.push([
            "amount",
            "数量不足です。",
            { product, amount, requiredAmount: product.stocks[color][size] },
          ]);
          return null;
        }

        reducers.push(() => {
          const count = product.stocks[color][size];
          product.stocks[color][size] = count - amount;
        });

        totalAmount = totalAmount + product.price * amount;
        return;
      }

      this.errors.push([product, "在庫がありません。"]);
    });

    const calculatedTotalAmount = Math.floor(totalAmount * taxRate);
    if (calculatedTotalAmount !== this.totalAmount) {
      this.errors.push([
        "totalAmount",
        "表示した金額と合致しません。",
        {
          totalAmount,
          taxRate,
          requestTotalAmount: this.totalAmount,
          calculatedTotalAmount,
        },
      ]);
    }

    if (this.valid) {
      reducers.forEach((reducer) => reducer());

      this.id = context.products.length + 1;
      this.state = Status.ordered;
      this.orderedAt = dayjs.format("YYYY-MM-DD HH:mm:ss");

      context.orders.push(this.serialize);
    }

    return this;
  }
}

module.exports = Order;
