module.exports = (actions = {}) => {
  class Policy {
    constructor (user, record) {
      this.user = user
      this.record = record

      Object
        .keys(actions)
        .map(action => this[action] = () => actions[action](user, record))
    }
  }

  return Policy
}
