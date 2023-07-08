import React, { ReactElement } from 'react'
import { Policy, When } from '../src/index'
import { AuthorisableUser, AuthorisablePost } from './types'
import { author, admin, post } from './example-data'

export default function WhenExample(): ReactElement {
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
      <h2>When Example</h2>
      <h3>Author Abilities:</h3>
      <ul>
        <When can="view" policy={policy}>
          <li>View</li>
        </When>
        <When can="publish" policy={policy}>
          <li>Publish</li>
        </When>
        <When can="destroy" policy={policy}>
          <li>Destroy</li>
        </When>
      </ul>
      <h3>Admin Abilities:</h3>
      <ul>
        <When can="view" policy={policy} user={admin} record={post}>
          <li>View</li>
        </When>
        <When can="publish" policy={policy} user={admin} record={post}>
          <li>Publish</li>
        </When>
        <When can="destroy" policy={policy} user={admin} record={post}>
          <li>Destroy</li>
        </When>
      </ul>
    </div>
  )
}
