const users = require("../datasource/user");
const shipmentInfo = require("../datasource/shipment_info");

class User {
  static find(id) {
    const params = users.find(it => it.id === id)

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
      shipmentInfo: this.shipmentInfo
    }
  }
}

module.exports = User
