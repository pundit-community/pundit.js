/** A function that can be used as a policy action. */
type ActionFunction = (user: unknown, record: unknown) => boolean

/** A method that can be used as a policy action. */
type ActionMethod = () => boolean

/**
 * A base class for creating Pundit.js policies. Policy classes can extend
 * from this class (recommended) or set up actions at runtime for an instance
 * of this class.
 */
export default class Policy {
  /** The user you want to authorise (such the current user of the app). */
  user: unknown

  /** A kind of "model" object, whose authorisation you want to check. */
  record: unknown

  /**
   * A map of policy action names and corresponding functions/methods that can
   * be used to permit or forbid actions of the user for the record.
   */
  actions: Map<string, ActionFunction | ActionMethod>

  /**
   * The constructor of the base policy class. This can be called with
   * super(user, record) and this.setup.apply(this) to initialise the policy
   * with the specified actions (methods) that are defined by the class that
   * extends Policy.
   *
   * @param user - The user being authorised by a policy action.
   * @param record - The record/object being authorised by a policy action.
   */
  constructor(user: unknown, record: unknown) {
    this.user = user
    this.record = record
    this.actions = new Map()
  }

  /**
   * Returns a boolean depending on whether the user is authorised to perform
   * the specified action.
   *
   * @param actionName - The name of the policy action being authorised.
   * @returns - True if the user is permitted to perform the action. False if
   * the user is forbidden from performing the action.
   */
  can(actionName: string): boolean {
    const actionFn = this.actions.get(actionName)
    return actionFn !== undefined ? actionFn(this.user, this.record) : false
  }

  /**
   * An optional helper method that can be used to manually add a function as an
   * action to the policy at runtime. Not needed if this.setup.apply(this) is
   * used in the class constructor.
   *
   * @param actionName - The intended name of the action to add to the policy.
   * @param actionFn - The intended function to authorise the action.
   */
  add(actionName: string, actionFn: ActionFunction): void {
    this.actions.set(actionName, actionFn)
  }

  /**
   * An optional helper method to make a copy of the policy with the same
   * user, record, and actions.
   *
   * @param user - Override the existing user property of the policy
   * @param record - Override the existing record property of the policy.
   * @returns - A copy of the policy.
   */
  copy(user: unknown, record: unknown): Policy {
    const newPolicy = new Policy(user || this.user, record || this.record)
    this.actions.forEach((actionFunction, actionName) => {
      newPolicy.add(actionName, actionFunction)
    })
    return newPolicy
  }

  /**
   * A helper function that can be called as a part of the policy constructor
   * using this.setup.apply(this). It automatically sets up all policy actions
   * based on the method names of the class (with the exception of the class
   * constructor).
   */
  setup(): void {
    const actionNames = Object.getOwnPropertyNames(
      this.constructor.prototype
    ).filter((methodName) => methodName !== 'constructor')
    this.actions = new Map(
      actionNames.map((actionName) => [
        actionName,
        (): boolean => this[actionName]()
      ])
    )
  }
}
