import React from 'react'
import { render, screen } from '@testing-library/react'
import Policy from '../../src/policy'
import When from '../../src/react/when'

describe('<When />', () => {
  describe('policy parameter', () => {
    const user = {}
    const record = {}
    const policy = new Policy(user, record)
    policy.add('view', () => true)
    policy.add('edit', () => false)

    it('displays <When /> child when action is permitted using "policy" param', () => {
      render(
        <When can="view" policy={policy}>
          <button type="button">View</button>
        </When>
      )
      expect(screen.queryByText('View')).toBeInTheDocument()
    })

    it('authorises multiple children within a single <When /> element', () => {
      render(
        <When can="view" policy={policy}>
          <button type="button">View 1</button>
          <button type="button">View 2</button>
        </When>
      )
      expect(screen.queryByText('View 1')).toBeInTheDocument()
      expect(screen.queryByText('View 2')).toBeInTheDocument()
    })

    it('does not display <When /> child when action is forbidden using "policy" param', () => {
      render(
        <When can="edit" policy={policy}>
          <button type="button">Edit</button>
        </When>
      )
      expect(screen.queryByText('Edit')).not.toBeInTheDocument()
    })

    it('does not display <When /> child when "policy" param is missing', () => {
      render(
        <When can="view">
          <button type="button">View</button>
        </When>
      )
      expect(screen.queryByText('View')).not.toBeInTheDocument()
    })
  })

  describe('user parameter', () => {
    type AuthorisableUser = { isReader: boolean; isEditor: boolean }
    const user: AuthorisableUser = { isReader: true, isEditor: false }
    const record = {}
    const policy = new Policy(null, record)
    policy.add('view', (userParam: AuthorisableUser) => userParam.isReader)
    policy.add('edit', (userParam: AuthorisableUser) => userParam.isEditor)

    it('displays <When /> child when action is permitted using "user" param', () => {
      render(
        <When can="view" policy={policy} user={user}>
          <button type="button">View</button>
        </When>
      )
      expect(screen.queryByText('View')).toBeInTheDocument()
    })

    it('does not display <When /> child when action is forbidden using "user" param', () => {
      render(
        <When can="edit" policy={policy} user={user}>
          <button type="button">Edit</button>
        </When>
      )
      expect(screen.queryByText('Edit')).not.toBeInTheDocument()
    })

    it('does not display <When /> child when the "policy" param has a null user and the "user" param is missing', () => {
      render(
        <When can="view" policy={new Policy(null, record)}>
          <button type="button">View</button>
        </When>
      )
      expect(screen.queryByText('View')).not.toBeInTheDocument()
    })

    it('does not display <When /> child when "user" param is specified but the "policy" param is missing', () => {
      render(
        <When can="view" user={user}>
          <button type="button">View</button>
        </When>
      )
      expect(screen.queryByText('View')).not.toBeInTheDocument()
    })
  })

  describe('record parameter', () => {
    type AuthorisableRecord = { published: boolean }
    const user = {}
    const record: AuthorisableRecord = { published: true }
    const policy = new Policy(user, null)
    policy.add(
      'view',
      (_userParam, recordParam: AuthorisableRecord) => recordParam.published
    )
    policy.add(
      'edit',
      (_userParam, recordParam: AuthorisableRecord) => !recordParam.published
    )

    it('displays <When /> child when action is permitted using "record" param', () => {
      render(
        <When can="view" policy={policy} record={record}>
          <button type="button">View</button>
        </When>
      )
      expect(screen.queryByText('View')).toBeInTheDocument()
    })

    it('does not display <When /> child when action is forbidden using "record" param', () => {
      render(
        <When can="edit" policy={policy} record={record}>
          <button type="button">Edit</button>
        </When>
      )
      expect(screen.queryByText('Edit')).not.toBeInTheDocument()
    })

    it('does not display <When /> child when the "policy" param has a null record and the "record" param is missing', () => {
      render(
        <When can="view" policy={new Policy(user, null)}>
          <button type="button">View</button>
        </When>
      )
      expect(screen.queryByText('View')).not.toBeInTheDocument()
    })

    it('does not display <When /> child when the "record" param is specified but the "policy" param is missing', () => {
      render(
        <When can="view" record={record}>
          <button type="button">View</button>
        </When>
      )
      expect(screen.queryByText('View')).not.toBeInTheDocument()
    })
  })
})
