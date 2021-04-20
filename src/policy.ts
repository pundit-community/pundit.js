interface ActionFunction {
  (user: any, record: any): boolean
}

export class Policy {
  user: any;
  record: any;
  actions: Map<string, ActionFunction>;

  constructor(user: any, record: any) {
    this.user = user;
    this.record = record;
    this.actions = new Map();
  }

  can(actionName: string): boolean {
    const actionFn = this.actions.get(actionName);

    if (!actionFn) {
      return false;
    }

    return actionFn(this.user, this.record);
  }

  add(actionName: string, actionFn: ActionFunction) {
    this.actions.set(actionName, actionFn);
  }
}
