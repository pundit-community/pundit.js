# pundit

Minimal and tiny authorization library that uses a plain old JavaScript object (POJO).

- No dependencies
- Written in TypeScript
- Small bundle size
- React/Preact support

> Ported/adapted from the [`pundit` gem](https://github.com/varvet/pundit).

## Introduction

Similarly to the pundit gem's simple PORO (plain old Ruby object) architecture, this library maintains a small,
user/record interface that is designed to be easy to use, flexible for evolving needs, and simple to test.
Authorization is an important part of applications, and is often overly coupled with business logic.

With pundit, we attempt to address some of that coupling by wrapping authorization logic and providing components
to keep your logic concise and readable where it's used.

## Installation

```bash
npm install --save pundit
# yarn add pundit
```

## Usage

In order to use Pundit, you can initialize a policy by passing an object of functions, called actions.
Actions typically map to permissions or routes in your application.

**Client-side permissions should not replace a proper authorization system in your backend.**

### Creating a policy

A policy accepts a user, often the current user of your session, and the resource you wish to authorize against.

```javascript
import pundit from 'pundit';

const PostPolicy = pundit({
  edit: (user, record) => user.id === record.userId,
  destroy: (user) => user.isAdmin(),
});

const policy = new PostPolicy(user, record);

policy.edit();
policy.destroy();
```

### Using with React

You can also expose UI elements when the current user is authorized using the `When` component.

```jsx
<When can="edit" user={currentUser} policy={somePolicy} resource={someResource}>
  <EditButton />
</When>
```

In order to avoid passing user/policy/resource props to every usage of the `When` component you can use the `PunditProvider`.

```jsx
<PunditProvider
  user={currentUser}
  policy={componentPolicy}
  resource={someComponent}
>
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

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

---

> Built by [johno](https://johno.com) ([@4lpine](https://twitter.com/4lpine)).
