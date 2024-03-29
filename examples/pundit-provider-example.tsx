import React, { ReactElement } from 'react'
import { Policy, PunditProvider, When } from '../src/index'
import { AuthorisableUser, AuthorisablePost } from './types'
import { author, admin, post } from './example-data'

export default function PunditProviderExample(): ReactElement {
  const policy = new Policy(author, post)
  policy.add('view', () => true)
  policy.add(
    'publish',
    (user: AuthorisableUser, record: AuthorisablePost) =>
      user.id === record.userId
  )
  policy.add('destroy', (user: AuthorisableUser) => user.isAdmin)

  return (
    <div>
      <h2>Pundit Provider Example</h2>
      <PunditProvider policy={policy}>
        <h3>Author Abilities:</h3>
        <ul>
          <When can="view">
            <li>View</li>
          </When>
          <When can="publish">
            <li>Publish</li>
          </When>
          <When can="destroy">
            <li>Destroy</li>
          </When>
        </ul>
      </PunditProvider>
      <PunditProvider policy={policy} user={admin}>
        <h3>Admin Abilities:</h3>
        <ul>
          <When can="view">
            <li>View</li>
          </When>
          <When can="publish">
            <li>Publish</li>
          </When>
          <When can="destroy">
            <li>Destroy</li>
          </When>
        </ul>
      </PunditProvider>
    </div>
  )
}
