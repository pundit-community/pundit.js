type ActionFunction = (user: unknown, record: unknown) => boolean;

export default class Policy {
  user: unknown;

  record: unknown;

  actions: Map<string, ActionFunction>;

  constructor(user: unknown, record: unknown) {
    this.user = user;
    this.record = record;
    this.actions = new Map();
  }

  can(actionName: string): boolean {
    const actionFn = this.actions.get(actionName);
    return actionFn !== undefined ? actionFn(this.user, this.record) : false;
  }

  add(actionName: string, actionFn: ActionFunction): void {
    this.actions.set(actionName, actionFn);
  }

  copy(user: unknown, record: unknown): Policy {
    const newPolicy = new Policy(user || this.user, record || this.record);
    this.actions.forEach((actionFunction, actionName) => {
      newPolicy.add(actionName, actionFunction);
    });
    return newPolicy;
  }
}
