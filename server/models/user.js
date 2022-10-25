const users = require("../datasource/user");
const shipmentInfo = require("../datasource/shipmentInfo");
const paymentInfo = require("../datasource/paymentInfo");

class User {
  static find(id) {
    const params = users.find(it => it.id === id)

    if (!params) {
      return
    }

    return new User(params)
  }

  static findByEmail(email) {
    const params = users.find(it => it.email === email)

    if (!params) {
      return
    }

    return new User(params)
  }

  constructor(params) {
    this.id = params.id
    this.firstName = params.name.split(" ")[0]
    this.lastName = params.name.split(" ")[1]
    this.firstNameKana = params.kana.split(" ")[0]
    this.lastNameKana = params.kana.split(" ")[1]
    this.email = params.email
    this.iconURL = params.iconURL
    this.birthday = params.birthday
  }

  get shipmentInfo() {
    const info = shipmentInfo.find((it) => it.userId === this.id)

    return info
  }

  get paymentInfo() {
    const info = paymentInfo.find((it) => it.userId === this.id)

    return info
  }

  get serialize() {
    return {
      id: this.id,
      email: this.email,
      iconURL: this.iconURL,
      firstName: this.firstName,
      lastName: this.lastName,
      firstNameKana: this.firstNameKana,
      lastNameKana: this.lastNameKana,
      birthday: this.birthday,
      shipmentInfo: this.shipmentInfo,
      paymentInfo: this.paymentInfo
    }
  }
}

module.exports = User
