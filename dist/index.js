'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _shasta = require('shasta');

var _immutable = require('immutable');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataComponent = function (_Component) {
  (0, _inherits3.default)(DataComponent, _Component);

  function DataComponent() {
    (0, _classCallCheck3.default)(this, DataComponent);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DataComponent.__proto__ || (0, _getPrototypeOf2.default)(DataComponent)).apply(this, arguments));

    if (!_this.constructor.storeProps) {
      throw new Error('DataComponent requires storeProps to be defined! Did you forget to use the connect decorator?');
    }
    return _this;
  }

  (0, _createClass3.default)(DataComponent, [{
    key: 'isPropResolving',
    value: function isPropResolving(prop) {
      return typeof this.props[prop] === 'undefined' || _immutable.Iterable.isIterable(this.props[prop]) && this.props[prop].get('pending') === true;
    }
  }, {
    key: 'isPropErrored',
    value: function isPropErrored(prop) {
      return _immutable.Iterable.isIterable(this.props[prop]) && this.props[prop].get('error') != null;
    }
  }, {
    key: 'isResolving',
    value: function isResolving() {
      return !this.isErrored() && !this.getResolvingFields().isEmpty();
    }
  }, {
    key: 'isErrored',
    value: function isErrored() {
      return !this.getErrors().isEmpty();
    }
  }, {
    key: 'getResolvingFields',
    value: function getResolvingFields() {
      var _this2 = this;

      // has keys that are either undefined/null or have a pending = true key
      return (0, _immutable.fromJS)(this.constructor.storeProps).reduce(function (prev, cursor, prop) {
        return _this2.isPropResolving(prop) ? prev.push(prop) : prev;
      }, (0, _immutable.List)());
    }
  }, {
    key: 'getErrors',
    value: function getErrors() {
      var _this3 = this;

      // has keys that have an error = data key
      return (0, _immutable.fromJS)(this.constructor.storeProps).reduce(function (prev, cursor, prop) {
        return _this3.isPropErrored(prop) ? prev.set(prop, _this3.props[prop].get('error')) : prev;
      }, (0, _immutable.Map)());
    }
  }, {
    key: 'getResolvedData',
    value: function getResolvedData() {
      var _this4 = this;

      return (0, _keys2.default)(this.constructor.storeProps).reduce(function (prev, prop) {
        var val = _this4.props[prop];
        if (!_this4.isPropResolving(prop)) {
          prev[prop] = _immutable.Iterable.isIterable(val) ? val.get('data') || val : val;
        }
        return prev;
      }, {});
    }
  }, {
    key: 'renderLoader',
    value: function renderLoader() {
      return null;
    }
  }, {
    key: 'renderErrors',
    value: function renderErrors() {
      return null;
    }
  }, {
    key: 'renderData',
    value: function renderData() {
      return null;
    }
  }, {
    key: 'tryResolveData',
    value: function tryResolveData() {
      if (!this.resolveData) return;
      var loading = this.getResolvingFields();
      if (loading.size === 0) return;
      this.resolveData();
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.tryResolveData();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (!this.handleResolved) return;
      if (this._resolved) return;
      var loading = this.getResolvingFields();
      if (loading.size !== 0) return;

      this._resolved = true;
      this.handleResolved(this.getResolvedData());
    }
  }, {
    key: 'render',
    value: function render() {
      return this.isResolving() ? this.renderLoader(this.getResolvingFields()) : this.isErrored() ? this.renderErrors(this.getErrors()) : this.renderData(this.getResolvedData());
    }
  }]);
  return DataComponent;
}(_shasta.Component);

DataComponent.displayName = 'DataComponent';
exports.default = DataComponent;
module.exports = exports['default'];