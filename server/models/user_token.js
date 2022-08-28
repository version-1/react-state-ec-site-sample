const tokens = require("../datasource/user_token");

class UserToken {
  static find(id) {
    const params = tokens.find(it => it.id === id)
    if (!params) {
      return
    }

    return new UserToken(params)
  }

  id;
  token;

  constructor(params = {}) {
    this.id = params.id
    this.token = params.token
  }

  get id() {
    return this.id
  }

  get token() {
    return this.token
  }
}

module.exports = UserToken
