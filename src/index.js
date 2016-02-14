import { Component } from 'shasta'
import { fromJS, Iterable } from 'immutable'
import pick from 'lodash.pick'
import reduce from 'lodash.reduce'
import some from 'lodash.some'

export default class DataComponent extends Component {
  static displayName = 'DataComponent';

  constructor() {
    super(...arguments)
    if (!this.constructor.storeProps) {
      throw new Error('DataComponent requires storeProps to be defined!')
    }
  }

  isFetching() {
    return !this.isErrored() && some(this.constructor.storeProps, (cursor, prop) =>
      typeof this.props[prop] === 'undefined'
    )
  }
  isErrored() {
    return some(this.constructor.storeProps, (cursor, prop) =>
      Iterable.isIterable(this.props[prop]) && this.props[prop].has('error')
    )
  }
  getLoadingFields() {
    return fromJS(reduce(this.constructor.storeProps, (prev, cursor, prop) => {
      if (typeof this.props[prop] === 'undefined') {
        prev.push(prop)
      }
      return prev
    }, []))
  }
  getErrors() {
    return fromJS(reduce(this.constructor.storeProps, (prev, cursor, prop) => {
      if (Iterable.isIterable(this.props[prop]) && this.props[prop].has('error')) {
        prev[prop] = this.props[prop].get('error')
      }
      return prev
    }, {}))
  }
  getData() {
    return pick(this.props, Object.keys(this.constructor.storeProps))
  }

  renderLoader() {
    return null
  }
  renderErrors() {
    return null
  }
  renderData() {
    return null
  }

  checkData() {
    if (!this.fetch) return
    const loading = this.getLoadingFields()
    if (loading.size === 0) return
    this.fetch()
  }
  componentWillMount() {
    this.checkData()
  }
  componentDidUpdate() {
    if (!this.fetched) return
    if (this._fetched) return
    const loading = this.getLoadingFields()
    if (loading.size !== 0) return

    this._fetched = true
    this.fetched()
  }

  render() {
    return this.isFetching()
      ? this.renderLoader(this.getLoadingFields())
      : this.isErrored()
        ? this.renderErrors(this.getErrors())
        : this.renderData(this.getData())
  }
}
