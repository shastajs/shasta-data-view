import { Component } from 'shasta'
import { fromJS, Iterable, List, Map } from 'immutable'

export default class DataComponent extends Component {
  static displayName = 'DataComponent';

  constructor() {
    super(...arguments)
    if (!this.constructor.storeProps) {
      throw new Error('DataComponent requires storeProps to be defined! Did you forget to use the connect decorator?')
    }
  }

  isPropResolving(prop) {
    return this.props[prop] == null ||
      (Iterable.isIterable(this.props[prop]) &&
      this.props[prop].get('pending') === true)
  }
  isPropErrored(prop) {
    return Iterable.isIterable(this.props[prop]) && this.props[prop].get('error') != null
  }
  isResolving() {
    return !this.isErrored() && !this.getResolvingFields().isEmpty()
  }
  isErrored() {
    return !this.getErrors().isEmpty()
  }
  getResolvingFields() {
    // has keys that are either undefined/null or have a pending = true key
    return fromJS(this.constructor.storeProps).reduce((prev, cursor, prop) =>
      this.isPropResolving(prop) ? prev.push(prop) : prev
    , List())
  }
  getErrors() {
    // has keys that have an error = data key
    return fromJS(this.constructor.storeProps).reduce((prev, cursor, prop) =>
      this.isPropErrored(prop)
        ? prev.set(prop, this.props[prop].get('error'))
        : prev
    , Map())
  }
  getResolvedData() {
    return Object.keys(this.constructor.storeProps).reduce((prev, prop) => {
      const val = this.props[prop]
      if (!this.isPropResolving(prop)) {
        prev[prop] = Iterable.isIterable(val) ? val.get('data') || val : val
      }
      return prev
    }, {})
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

  tryResolveData() {
    if (!this.resolveData) return
    const loading = this.getResolvingFields()
    if (loading.size === 0) return
    this.resolveData()
  }
  componentWillMount() {
    this.tryResolveData()
  }
  componentDidUpdate() {
    if (!this.handleResolved) return
    if (this._resolved) return
    const loading = this.getResolvingFields()
    if (loading.size !== 0) return

    this._resolved = true
    this.handleResolved(this.getResolvedData())
  }

  render() {
    return this.isResolving()
      ? this.renderLoader(this.getResolvingFields())
      : this.isErrored()
        ? this.renderErrors(this.getErrors())
        : this.renderData(this.getResolvedData())
  }
}
