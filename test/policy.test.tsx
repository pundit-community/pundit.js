import Policy from '../src/policy'

describe('can function', () => {
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

describe('add function', () => {
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

describe('copy function', () => {
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
