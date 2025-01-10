# Pundit.js

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/pundit-community/pundit.js/blob/main/LICENSE)
[![NPM](https://img.shields.io/npm/v/pundit.svg)](https://www.npmjs.com/package/pundit)
[![CI](https://github.com/pundit-community/pundit.js/workflows/CI/badge.svg)](https://github.com/pundit-community/pundit.js/actions/workflows/ci.yml)

Minimal and tiny authorisation library that uses a plain old JavaScript object
(POJO).

- No dependencies
- Written in TypeScript
- Small bundle size
- React/Preact support

Adapted from the [Pundit Ruby gem](https://github.com/varvet/pundit).

## Introduction

Similar to the Pundit gem's simple PORO (plain old Ruby object) architecture,
this library maintains a small, user/record interface that is designed to be
easy to use, flexible for evolving needs, and simple to test. Authorisation is
an important part of applications, and is often overly coupled with business
logic.

With Pundit.js, we attempt to address some of that coupling by wrapping
authorisation logic and providing components to keep your logic concise and
readable where it's used.

## Installation

```bash
npm install --save pundit
# yarn add pundit
# pnpm add pundit
```

## Documentation

Visit https://pundit-community.github.io/pundit.js to view the full
documentation.

## Usage

In order to use Pundit.js, you can initialise a policy by setting up an object
of functions/methods called actions. Actions typically map to permissions or
routes in your application.

**Client-side permissions should not replace a proper authorisation system in
your backend.**

### Creating a policy

A policy accepts a user, often the current user of your session, and the
resource you wish to authorise against, referred to as a record.

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

You can determine what is shown based on what a user is authorised to see by
using the `When` component.

```jsx
import { When } from 'pundit'
import PostPolicy from 'src/policies/post.policy.js'

// ...

return (
  <When can="edit" policy={postPolicy} user={user} record={post}>
    <EditButton />
  </When>
)
```

The `user` and `record` attributes are not required if these passed into the
policy's contructor when instantiating it. The following acts as a shorthand:

```jsx
return (
  <When can="edit" policy={new PostPolicy(user, post)}>
    <EditButton />
  </When>
)
```

In order to avoid passing user/policy/record props to every usage of the
`When` component you can use the `PunditProvider`.

```jsx
import { PunditProvider, When } from 'pundit'
import PostPolicy from 'src/policies/post.policy.js'

// ...

return (
  <PunditProvider policy={postPolicy} user={user} record={post}>
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
)
```

As with the `When` component, you can pass the `user` and `record` attributes
via the policy's constructor with `PunditProvider`. You can also override these
attributes for particular usages of `When` within the provider, for example to
check if an alternative user or record is authorised.

```jsx
return (
  <PunditProvider policy={new PostPolicy(user, post)}>
    <When can="view">
      <Link>View Post</Link>
    </When>
    <When can="view" user={masqueradeUser}>
      <Link>View Post Masquerading as {masqueradeUser.name}</Link>
    </When>
    <When can="view" record={nextPost}>
      <Link>View Next Post</Link>
    </When>
  </PunditProvider>
)
```

### Testing

Policies can be unit tested, for example with Jest/Vitest:

```javascript
import PostPolicy from 'src/policies/post.policy.js'

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

Pundit.js is released under the [MIT License](https://opensource.org/licenses/MIT).

## Contributing

1. Fork it
1. Create your feature branch (`git checkout -b my-new-feature`)
1. Commit your changes (`git commit -am 'Add some feature'`)
1. Push to the branch (`git push origin my-new-feature`)
1. Create new Pull Request

## Authors

Built by [johno](https://johno.com) ([@4lpine](https://twitter.com/4lpine)) and
[Chris Alley](https://github.com/chrisalley).
