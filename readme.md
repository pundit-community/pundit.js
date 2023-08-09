# Pundit.js

Minimal and tiny authorization library that uses a plain old JavaScript object
(POJO).

- No dependencies
- Written in TypeScript
- Small bundle size
- React/Preact support

Adapted from the [Pundit Ruby gem](https://github.com/varvet/pundit).

## Introduction

Similar to the Pundit gem's simple PORO (plain old Ruby object) architecture,
this library maintains a small, user/record interface that is designed to be
easy to use, flexible for evolving needs, and simple to test. Authorization is
an important part of applications, and is often overly coupled with business
logic.

With Pundit.js, we attempt to address some of that coupling by wrapping
authorization logic and providing components to keep your logic concise and
readable where it's used.

## Installation

```bash
npm install --save pundit
# yarn add pundit
# pnpm add pundit
```

## Usage

In order to use Pundit.js, you can initialize a policy by setting up an object
of functions/methods called actions. Actions typically map to permissions or
routes in your application.

**Client-side permissions should not replace a proper authorization system in
your backend.**

### Creating a policy

A policy accepts a user, often the current user of your session, and the
resource you wish to authorize against.

Policies can be defined by extending the `Policy` class. Add a constructor that
accepts the user and record objects as parameters, also calling
`this.setup.apply(this)` to initialise the actions defined in the class.

```javascript
import { Policy } from 'pundit'

export default class PostPolicy extends Policy {
  constructor(user, record) {
    super(user, record)
    this.setup.apply(this)
  }

  edit() {
    return this.user.id === this.record.userId
  }

  destroy() {
    return this.user.isAdmin
  }
}
```

Actions are defined as methods belonging to the extended `Policy` class. Each
action method should return true or false depending on whether the specified
user/record combination is permitted for that action.

You can then instantiate the class and use the `can` method to check if the
action is authorised.

```javascript
import PostPolicy from 'src/policies/post.policy.js'

const user = { id: 1, isAdmin: false }
const post = { id: 11, userId: 1 }
const postPolicy = new PostPolicy(user, post)

postPolicy.can('edit') // Returns true
postPolicy.can('destroy') // Returns false
```

Since the role of Pundit.js is to reuse authorisation logic, for real world use
we recommend that you define policy classes in a centralised folder in
your application such as `src/policies`. The policies can then be imported
into each file that needs to check the authorisation rules for the resource
type.

Actions can also be added to an instantiated policy by using the `add` method
which accepts a plain function with user and record parameters. The following
is equivalent logic to defining policy actions by extending the `Policy` class:

```javascript
import { Policy } from 'pundit'

const user = { id: 1, isAdmin: false }
const post = { id: 11, userId: 1 }
const postPolicy = new Policy(user, post)

postPolicy.add('edit', (user, record) => user.id === record.userId)
postPolicy.add('destroy', (user) => user.isAdmin)

postPolicy.can('edit') // Returns true
postPolicy.can('destroy') // Returns false
```

### Using with React

You can use determine what is shown based on what a user is authorized to see
using the `When` component.

```jsx
<When can="edit" user={user} policy={postPolicy} record={postRecord}>
  <EditButton />
</When>
```

In order to avoid passing user/policy/resource props to every usage of the
`When` component you can use the `PunditProvider`.

```jsx
<PunditProvider user={user} policy={postPolicy} record={postRecord}>
  <When can="view">
    <Link />
  </When>
  <When can="fork">
    <ForkButton />
  </When>
  <When can="edit">
    <EditButton />
  </When>
  <When can="destroy">
    <DeleteButton />
  </When>
</PunditProvider>
```

### Testing

Policies can be unit tested, for example with Jest/Vitest:

```javascript
describe('post policy, edit action', () => {
  const user = { id: 1 }

  it('grants access if post is authored by user', () => {
    const post = { userId: user.id }
    expect(new PostPolicy(user, post).can('edit')).toBe(true)
  })

  it('denies access if post is not authored by user', () => {
    const differentUser = { id: 2 }
    const post = { userId: differentUser.id }
    expect(new PostPolicy(user, post).can('edit')).toBe(false)
  })
})
```

## License

MIT

## Contributing

1. Fork it
1. Create your feature branch (`git checkout -b my-new-feature`)
1. Commit your changes (`git commit -am 'Add some feature'`)
1. Push to the branch (`git push origin my-new-feature`)
1. Create new Pull Request

---

> Built by [johno](https://johno.com) ([@4lpine](https://twitter.com/4lpine))
> and [Chris Alley](https://github.com/chrisalley).
