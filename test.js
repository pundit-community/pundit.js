import test from 'ava'
import React from 'react'
import { renderToString } from 'react-dom/server'

import When from './src/react'

import pundit from './src'

const user = { id: 123 }
const record = { userId: user.id }

const TestPolicy = pundit({
  edit: (user, record) => record.userId === user.id,
  show: true,
  destroy: false
})

const policy = new TestPolicy(user, record)

test('it returns an object with policy functions', t => t.snapshot(policy))

test('it correctly evaluates truthy functions', t => t.truthy(policy.edit()))

test('it correctly evaluates falsy functions', t => {
  const pol = new TestPolicy(user, {})
  t.falsy(pol.edit())
})

test('When shows children when authorized', t => {
  const result = renderToString(
    <When
      user={user}
      policy={policy}
      can='edit'
      resource={record}
    >
      <h1>Hi</h1>
    </When>
  )

  t.snapshot(result)
})

test('When hides children when unauthorized', t => {
  const result = renderToString(
    <When
      user={{}}
      policy={policy}
      can='edit'
      resource={record}
    >
      <h1>Hi</h1>
    </When>

  )

  t.snapshot(result)
})
