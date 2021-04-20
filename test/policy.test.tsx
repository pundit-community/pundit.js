import { Policy } from '../src/policy';

const policy = new Policy(null, null);

it('returns false if an action does not exist', () => {
  expect(policy.can('edit')).toBeFalsy();
});

it('evaluates an action when called', () => {
  policy.add('destroy', (user: any, record: any): boolean => {
    expect(user).toBeNull();
    expect(record).toBeNull();
    return true;
  });

  expect(policy.can('destroy')).toBeTruthy();
});
