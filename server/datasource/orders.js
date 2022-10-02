module.exports = [
  {
    id: 1,
    userId: 1,
    totalAmount: 5500,
    products: [
      {
        code: "SHAyZRt1",
        form: {
          color: 'red',
          size: 'm',
          amount: 1
        },
      },
    ],
    shipmentInfoId: 1,
    paymentInfoId: 1,
    state: 'shipped',
    orderedAt: '2022-10-01 00:00:00',
  },
  {
    id: 2,
    userId: 1,
    totalAmount: 108000,
    products: [
      {
        code: "RNKxV9hp",
        form: {
          color: 'navy',
          size: 'm',
          amount: 1
        },
      },
      {
        code: "iIg7Ylf3",
        form: {
          color: 'black',
          size: 'm',
          amount: 1
        },
      }
    ],
    shipmentInfoId: 1,
    paymentInfoId: 1,
    state: 'delivered',
    orderedAt: '2022-07-01 00:00:00',
  },
  {
    id: 3,
    userId: 1,
    totalAmount: 88000,
    products: [
      {
        code: "e4MjkFon",
        form: {
          color: 'white',
          size: 'm',
          amount: 1
        },
      },
      {
        code: "4LzxDqHU",
        form: {
          color: 'black',
          size: 'm',
          amount: 1
        },
      }
    ],
    shipmentInfoId: 1,
    paymentInfoId: 1,
    state: 'delivered',
    orderedAt: '2022-02-01 00:00:00',
  }
]
