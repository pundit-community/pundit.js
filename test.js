const test = require('ava')

const TestPolicy = require('./src')({
  edit: (user, record) => record.userId === user.id,
  show: true,
  destroy: false
})

const user = { id: 123 }
const record = { userId: user.id }

const policy = new TestPolicy(user, record)

test('it returns an object with policy functions', t => t.snapshot(policy))

test('it correctly evaluates truthy functions', t => t.truthy(policy.edit()))

test('it correctly evaluates falsy functions', t => {
  const pol = new TestPolicy(user, {})
  t.falsy(pol.edit())
})
