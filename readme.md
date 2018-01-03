# pundit [![Build Status](https://secure.travis-ci.org/johnotander/pundit.svg?branch=master)](https://travis-ci.org/johnotander/pundit) [![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

Minimal authorization through a plain old JavaScript object, ported to JS from the [Ruby gem](https://github.com/varvet/pundit).
Fits nicely into any app/framework including Express, Micro, React, Vue, Graphql, etc.

## Installation

```bash
npm install --save pundit
```

## Usage

In order to use Pundit, you can initialize a policy by passing an object of functions.
These functions are called actions.
Actions typically map to routes in your application.

A policy accepts a user, often the current user of your session, and the resource you wish to authorize against.

```javascript
const pundit = require('pundit')

const PostPolicy = pundit({
  edit: (user, record) => user.id === record.id,
  destroy: (user) => user.isAdmin()
})

const policy = new PostPolicy(user, record)

policy.edit()
policy.destroy()
```

### Using with Express

```js

```

### Using with Graphql

In Graphql land, you can authorize returned objects using Pundit in the `resolve` callback of the query.

```js

```

### Using with React

You can also expose UI elements when the current user is authorized using the `When` component.
It is recommended to wrap `When` with your own Component that automatically defines the user and policy for the resource.

```jsx
<When
  user={currentUser}
  can='edit'
  resource={post}
  policy={policy}
>
  <EditButton />
</When>
```

## License

MIT

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

Crafted with <3 by John Otander ([@4lpine](https://twitter.com/4lpine)).

***

> This package was initially generated with [yeoman](http://yeoman.io) and the [p generator](https://github.com/johnotander/generator-p.git).
