import React, { ReactElement } from 'react'
import { Policy, PunditProvider, When } from '../src/index'
import { AuthorisableUser, AuthorisablePost } from './types'
import { author, admin, post } from './example-data'

class PostPolicy extends Policy {
  user: AuthorisableUser

  record: AuthorisablePost

  constructor(user: AuthorisableUser, record: AuthorisablePost) {
    super(user, record)
    this.actions = new Map([
      ['view', (): boolean => this.view()],
      ['publish', (): boolean => this.publish()],
      ['destroy', (): boolean => this.destroy()],
    ])
  }

  // eslint-disable-next-line class-methods-use-this
  view(): boolean {
    return true
  }

  publish(): boolean {
    return this.user.id === this.record.userId
  }

  destroy(): boolean {
    return this.user.isAdmin
  }
}

export default function ExtendedPolicyExample(): ReactElement {
  return (
    <div>
      <h2>Extended Policy Example</h2>
      <PunditProvider policy={new PostPolicy(author, post)}>
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
      <PunditProvider policy={new PostPolicy(admin, post)}>
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
