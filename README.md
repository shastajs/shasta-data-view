# shasta-data-view [![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url] [![Build Status][travis-image]][travis-url]

Simple component for managing asynchronous data dependency states. If you have a view with 3 base states: fetching, loaded, and errored - this will help you clean up a lot of boilerplate.

This is a work in progress - There is sparse documentation, no tests, and it's not on npm. Use at your own risk while we finish up!

## Install

```
npm install shasta-data-view --save
```

## API

You can define three functions:

- `fetch`
  - Defaults to doing nothing
  - Triggered on mount/update when any `storeProps` are not fulfilled
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
import { PropTypes } from 'shasta'
import DataComponent from 'shasta-data-view'
import './index.sass'

class UserList extends DataComponent {
  static displayName = 'UserList';
  static propTypes = {
    users: PropTypes.iterable
  };
  static storeProps = {
    users: 'requests.users'
  };

  fetch () {
    this.actions.api.users.find({ requestId: 'users' })
  }

  renderData ({ users }) {
    return <div className='ui list relaxed column'>
      <div className='ui header'>{users.size} Users</div>
      {
        users.map((user) =>
          <div className='ui item' key={user.get('id')}>
            <i className='ui icon large user middle aligned'/>
            <div className='content'>
              <div className='ui header'>{user.get('name')}</div>
            </div>
          </div>
        )
      }
    </div>
  }
  renderLoader () {
    return <div className='ui header'>Loading...</div>
  }
  renderErrors (errors) {
    return <div className='errors'>
      Failed to Load:
      {
        errors.map((err, field) =>
          <div key={field}>{field}: {err.message}</div>
        ).toArray()
      }
    </div>
  }
}

export default DataComponent.connect(UserList, require('core/actions'))
```

[downloads-image]: http://img.shields.io/npm/dm/shasta-data-view.svg
[npm-url]: https://npmjs.org/package/shasta-data-view
[npm-image]: http://img.shields.io/npm/v/shasta-data-view.svg

[travis-url]: https://travis-ci.org/shastajs/shasta-data-view
[travis-image]: https://travis-ci.org/shastajs/shasta-data-view.png?branch=master
