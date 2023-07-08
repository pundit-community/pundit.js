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

  // Todo: remove duplication after allowing user and record params to be passed
  // to <PunditProvider /> to override those passed in via the policy param.
  const policy2 = new Policy(admin, post)
  policy2.add('view', () => true)
  policy2.add(
    'publish',
    (user: AuthorisableUser, record: AuthorisablePost) =>
      user.id === record.userId
  )
  policy2.add('destroy', (user: AuthorisableUser) => user.isAdmin)

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
      <PunditProvider policy={policy2}>
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
