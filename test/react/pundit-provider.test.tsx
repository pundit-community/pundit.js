import React from 'react'
import { render, screen } from '@testing-library/react'
import { expect } from 'vitest'
import Policy from '../../src/policy'
import { PunditProvider } from '../../src/react/pundit-provider'
import When from '../../src/react/when'

describe('<PunditProvider />', () => {
  describe('policy parameter', () => {
    const user = {}
    const record = {}
    const policy = new Policy(user, record)
    policy.add('view', () => true)
    policy.add('edit', () => false)

    it('displays <When /> child when action is permitted', () => {
      render(
        <PunditProvider policy={policy}>
          <When can="view">
            <button type="button">View</button>
          </When>
        </PunditProvider>
      )
      expect(screen.queryByText('View')).toBeInTheDocument()
    })

    it('does not display <When /> child when action is forbidden', () => {
      render(
        <PunditProvider policy={policy}>
          <When can="edit">
            <button type="button">Edit</button>
          </When>
        </PunditProvider>
      )
      expect(screen.queryByText('Edit')).not.toBeInTheDocument()
    })

    it('authorises multiple <When /> children from a single provider', () => {
      render(
        <PunditProvider policy={policy}>
          <When can="view">
            <button type="button">View</button>
          </When>
          <When can="edit">
            <button type="button">Edit</button>
          </When>
        </PunditProvider>
      )
      expect(screen.queryByText('View')).toBeInTheDocument()
      expect(screen.queryByText('Edit')).not.toBeInTheDocument()
    })

    it('authorises nested <When /> child elements', () => {
      render(
        <PunditProvider policy={policy}>
          <When can="view">
            <button type="button">View</button>
            <When can="edit">
              <button type="button">Edit</button>
            </When>
          </When>
        </PunditProvider>
      )
      expect(screen.queryByText('View')).toBeInTheDocument()
      expect(screen.queryByText('Edit')).not.toBeInTheDocument()
    })

    it('does not authorise <When /> children outside of a provider', () => {
      render(
        <>
          <PunditProvider policy={policy}>
            <div />
          </PunditProvider>
          <When can="view">
            <button type="button">View</button>
          </When>
        </>
      )
      expect(screen.queryByText('View')).not.toBeInTheDocument()
    })

    it('authorises <When /> children from multiple providers', () => {
      render(
        <>
          <PunditProvider policy={policy}>
            <When can="view">
              <button type="button">View</button>
            </When>
          </PunditProvider>
          <PunditProvider policy={policy}>
            <When can="edit">
              <button type="button">Edit</button>
            </When>
          </PunditProvider>
        </>
      )
      expect(screen.queryByText('View')).toBeInTheDocument()
      expect(screen.queryByText('Edit')).not.toBeInTheDocument()
    })

    it('authorises <When /> children from multiple policies', () => {
      const policy2 = new Policy(user, record)
      policy2.add('edit', () => false)
      render(
        <>
          <PunditProvider policy={policy}>
            <When can="view">
              <button type="button">View</button>
            </When>
          </PunditProvider>
          <PunditProvider policy={policy2}>
            <When can="edit">
              <button type="button">Edit</button>
            </When>
          </PunditProvider>
        </>
      )
      expect(screen.queryByText('View')).toBeInTheDocument()
      expect(screen.queryByText('Edit')).not.toBeInTheDocument()
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
        <PunditProvider policy={policy} user={user}>
          <When can="view">
            <button type="button">View</button>
          </When>
        </PunditProvider>
      )
      expect(screen.queryByText('View')).toBeInTheDocument()
    })

    it('does not display <When /> child when action is forbidden using "user" param', () => {
      render(
        <PunditProvider policy={policy} user={user}>
          <When can="edit">
            <button type="button">Edit</button>
          </When>
        </PunditProvider>
      )
      expect(screen.queryByText('Edit')).not.toBeInTheDocument()
    })

    it('does not display <When /> child when the "policy" param has a null user and the "user" param is missing', () => {
      render(
        <PunditProvider policy={new Policy(null, record)}>
          <When can="view">
            <button type="button">View</button>
          </When>
        </PunditProvider>
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
        <PunditProvider policy={policy} record={record}>
          <When can="view">
            <button type="button">View</button>
          </When>
        </PunditProvider>
      )
      expect(screen.queryByText('View')).toBeInTheDocument()
    })

    it('does not display <When /> child when action is forbidden using "record" param', () => {
      render(
        <PunditProvider policy={policy} record={record}>
          <When can="edit">
            <button type="button">Edit</button>
          </When>
        </PunditProvider>
      )
      expect(screen.queryByText('Edit')).not.toBeInTheDocument()
    })

    it('does not display <When /> child when the "policy" param has a null record and the "record" param is missing', () => {
      render(
        <PunditProvider policy={new Policy(user, null)}>
          <When can="view">
            <button type="button">View</button>
          </When>
        </PunditProvider>
      )
      expect(screen.queryByText('View')).not.toBeInTheDocument()
    })
  })
})
