import Policy from '../src/policy'

describe('can method', () => {
  const policy = new Policy(null, null)

  it('returns true if the action is authorised', () => {
    const actionName = 'view'
    policy.add(actionName, () => true)
    expect(policy.can(actionName)).toBe(true)
  })

  it('returns false if the action is not authorised', () => {
    const actionName = 'edit'
    policy.add(actionName, () => false)
    expect(policy.can(actionName)).toBe(false)
  })

  it('returns false if the action does not exist', () => {
    const actionName = 'missingAction'
    expect(policy.can(actionName)).toBe(false)
  })
})

describe('add method', () => {
  const policy = new Policy(null, null)

  it('adds an action to an instance of the Policy class', () => {
    const actionName = 'view'
    const actionFunction = (): boolean => true
    policy.add(actionName, actionFunction)
    expect(policy.actions.get(actionName)).toEqual(actionFunction)
  })

  it('allows the action function to be replaced', () => {
    const actionName = 'edit'
    const actionFunction = (): boolean => true
    policy.add(actionName, actionFunction)
    const replacementFunction = (): boolean => false
    policy.add(actionName, replacementFunction)
    expect(policy.actions.get(actionName)).toEqual(replacementFunction)
  })
})

describe('copy method', () => {
  it('copies the user and record params when these are specified', () => {
    const originalPolicy = new Policy(undefined, undefined)
    const paramUser = { id: 1 }
    const paramRecord = { id: 10 }
    const copiedPolicy = originalPolicy.copy(paramUser, paramRecord)
    expect(copiedPolicy.user).toEqual(paramUser)
    expect(copiedPolicy.record).toEqual(paramRecord)
  })

  it('copies the user and record of the original policy', () => {
    const originalPolicy = new Policy({ id: 1 }, { id: 10 })
    const copiedPolicy = originalPolicy.copy(undefined, undefined)
    expect(copiedPolicy.user).toEqual(originalPolicy.user)
    expect(copiedPolicy.record).toEqual(originalPolicy.record)
  })

  it('prioritises user/record params over the original policy fields', () => {
    const originalPolicy = new Policy({ id: 1 }, { id: 10 })
    const copiedPolicy = originalPolicy.copy({ id: 2 }, { id: 11 })
    expect(copiedPolicy.user).not.toEqual(originalPolicy.user)
    expect(copiedPolicy.record).not.toEqual(originalPolicy.record)
  })

  it('copies an action of the original policy', () => {
    const originalPolicy = new Policy(undefined, undefined)
    const actionName = 'view'
    const actionFunction = (): boolean => true
    originalPolicy.add(actionName, actionFunction)
    const copiedPolicy = originalPolicy.copy(undefined, undefined)
    expect(copiedPolicy.actions.get(actionName)).toEqual(actionFunction)
  })
})

describe('setup method', () => {
  type AuthorisableUser = { isAdmin: boolean }
  type AuthorisableRecord = { draft: boolean }

  class PostPolicy extends Policy {
    user: AuthorisableUser

    record: AuthorisableRecord

    constructor(
      user: AuthorisableUser | undefined,
      record: AuthorisableRecord | undefined
    ) {
      super(user, record)
      this.setup.apply(this)
    }

    view(): boolean {
      return true
    }

    edit(): boolean {
      if (this.user?.isAdmin || this.record?.draft) {
        return true
      }
      return false
    }
  }

  it('does not turn the policy class constructor into an action', () => {
    const postPolicy = new PostPolicy(undefined, undefined)
    expect(postPolicy.actions.has('constructor')).toBe(false)
  })

  it('copies the correct number of actions into the actions map', () => {
    const postPolicy = new PostPolicy(undefined, undefined)
    expect(postPolicy.actions.size).toEqual(2)
  })

  it('copies the action names defined in the class into the actions map', () => {
    const postPolicy = new PostPolicy(undefined, undefined)
    expect(postPolicy.actions.has('view')).toBe(true)
    expect(postPolicy.actions.has('edit')).toBe(true)
  })

  it('copies the action methods defined in the class into the actions map', () => {
    const postPolicy = new PostPolicy(undefined, undefined)
    expect(postPolicy.can('view')).toBe(true)
    expect(postPolicy.can('edit')).toBe(false)
  })

  it('copies the user property of the class instance into the actions map', () => {
    const admin = { isAdmin: true }
    expect(new PostPolicy(admin, undefined).can('edit')).toBe(true)
    const nonAdmin = { isAdmin: false }
    expect(new PostPolicy(nonAdmin, undefined).can('edit')).toBe(false)
  })

  it('copies the record property of the class instance into the actions map', () => {
    const draftPost = { draft: true }
    expect(new PostPolicy(undefined, draftPost).can('edit')).toBe(true)
    const publishedPost = { draft: false }
    expect(new PostPolicy(undefined, publishedPost).can('edit')).toBe(false)
  })
})
