import React, { ReactElement } from 'react'
import { Policy, PunditProvider, When } from '../src/index'

export default function BasicExample(): ReactElement {
  const user = {}
  const record = {}
  const policy = new Policy(user, record)
  policy.add('view', () => true)
  policy.add('edit', () => false)

  return (
    <div>
      <h2>Basic Example</h2>
      <PunditProvider policy={policy}>
        <h3>Abilities:</h3>
        <ul>
          <When can="view">
            <li>View</li>
          </When>
          <When can="edit">
            <li>Edit</li>
          </When>
        </ul>
      </PunditProvider>
    </div>
  )
}
