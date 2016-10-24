# shasta-data-view [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

Simple component for managing asynchronous data dependency states. If you have a view with 3 base states: fetching, loaded, and errored - this will help you clean up a lot of boilerplate. Works out of the box with [tahoe](https://github.com/shastajs/tahoe) for doing API stuff.

This is a work in progress - There is sparse documentation, no tests, and it's not on npm. Use at your own risk while we finish up!

## Install

```
npm install shasta-data-view --save
```

## API

You can define three functions:

- `resolveData`
  - Defaults to doing nothing
  - Triggered on mount/update when any `storeProps` (what you give to shasta's connect function) are not fulfilled
  - Responsible for dispatching any actions to fetch data
- `renderData`
  - Defaults to displaying nothing
  - Triggered when all storeProps are resolved
  - Receives a data object as an argument
  - Responsible for rendering the data
- `renderLoader`
  - Defaults to displaying nothing
  - Triggered when all storeProps are not resolved
  - Responsible for rendering a loader
- `renderErrors`
  - Defaults to displaying nothing
  - Triggered when any storeProp value has an `error` attribute
  - Receives an errors Map as an argument
    - Key is the storeProp
    - Value is the error object
  - Responsible for rendering any errors that happened while fetching data

## Example

```js
import React from 'react'
import { PropTypes, connect } from 'shasta'
import actions from 'core/actions'
import DataComponent from 'shasta-data-view'

@connect({ users: 'api.subsets.users' })
class UserList extends DataComponent {
  static displayName = 'UserList';
  static propTypes = {
    users: PropTypes.iterable
  };

  resolveData () {
    actions.api.users.find({ subset: 'users' })
  }

  renderData ({ users }) {
    return (<div>
      <h1>{users.size} Users</h1>
      <ul>
      {
        users.map((user) =>
          <li key={user.get('id')}>{user.get('name')}</li>
        )
      }
      </ul>
    </div>)
  }
  renderLoader () {
    return <h1>Loading...</h1>
  }
  renderErrors (errors) {
    return (<ul>
      {
        errors.map((err, field) =>
          <li key={field}>{field}: {err.message}</li>
        ).toArray()
      }
    </ul>)
  }
}
```

[downloads-image]: http://img.shields.io/npm/dm/shasta-data-view.svg
[npm-url]: https://npmjs.org/package/shasta-data-view
[npm-image]: http://img.shields.io/npm/v/shasta-data-view.svg

[travis-url]: https://travis-ci.org/shastajs/shasta-data-view
[travis-image]: https://travis-ci.org/shastajs/shasta-data-view.png?branch=master
