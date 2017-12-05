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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJEYXRhQ29tcG9uZW50IiwiYXJndW1lbnRzIiwiY29uc3RydWN0b3IiLCJzdG9yZVByb3BzIiwiRXJyb3IiLCJwcm9wIiwicHJvcHMiLCJpc0l0ZXJhYmxlIiwiZ2V0IiwiaXNFcnJvcmVkIiwiZ2V0UmVzb2x2aW5nRmllbGRzIiwiaXNFbXB0eSIsImdldEVycm9ycyIsInJlZHVjZSIsInByZXYiLCJjdXJzb3IiLCJpc1Byb3BSZXNvbHZpbmciLCJwdXNoIiwiaXNQcm9wRXJyb3JlZCIsInNldCIsInZhbCIsInJlc29sdmVEYXRhIiwibG9hZGluZyIsInNpemUiLCJ0cnlSZXNvbHZlRGF0YSIsImhhbmRsZVJlc29sdmVkIiwiX3Jlc29sdmVkIiwiZ2V0UmVzb2x2ZWREYXRhIiwiaXNSZXNvbHZpbmciLCJyZW5kZXJMb2FkZXIiLCJyZW5kZXJFcnJvcnMiLCJyZW5kZXJEYXRhIiwiZGlzcGxheU5hbWUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBOztBQUNBOzs7O0lBRXFCQSxhOzs7QUFHbkIsMkJBQWM7QUFBQTs7QUFBQSxxSkFDSEMsU0FERzs7QUFFWixRQUFJLENBQUMsTUFBS0MsV0FBTCxDQUFpQkMsVUFBdEIsRUFBa0M7QUFDaEMsWUFBTSxJQUFJQyxLQUFKLENBQVUsK0ZBQVYsQ0FBTjtBQUNEO0FBSlc7QUFLYjs7OztvQ0FFZUMsSSxFQUFNO0FBQ3BCLGFBQU8sT0FBTyxLQUFLQyxLQUFMLENBQVdELElBQVgsQ0FBUCxLQUE0QixXQUE1QixJQUNKLG9CQUFTRSxVQUFULENBQW9CLEtBQUtELEtBQUwsQ0FBV0QsSUFBWCxDQUFwQixLQUNELEtBQUtDLEtBQUwsQ0FBV0QsSUFBWCxFQUFpQkcsR0FBakIsQ0FBcUIsU0FBckIsTUFBb0MsSUFGdEM7QUFHRDs7O2tDQUNhSCxJLEVBQU07QUFDbEIsYUFBTyxvQkFBU0UsVUFBVCxDQUFvQixLQUFLRCxLQUFMLENB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anMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdzaGFzdGEnXG5pbXBvcnQgeyBmcm9tSlMsIEl0ZXJhYmxlLCBMaXN0LCBNYXAgfSBmcm9tICdpbW11dGFibGUnXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIERhdGFDb21wb25lbnQgZXh0ZW5kcyBDb21wb25lbnQge1xuICBzdGF0aWMgZGlzcGxheU5hbWUgPSAnRGF0YUNvbXBvbmVudCc7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoLi4uYXJndW1lbnRzKVxuICAgIGlmICghdGhpcy5jb25zdHJ1Y3Rvci5zdG9yZVByb3BzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0RhdGFDb21wb25lbnQgcmVxdWlyZXMgc3RvcmVQcm9wcyB0byBiZSBkZWZpbmVkISBEaWQgeW91IGZvcmdldCB0byB1c2UgdGhlIGNvbm5lY3QgZGVjb3JhdG9yPycpXG4gICAgfVxuICB9XG5cbiAgaXNQcm9wUmVzb2x2aW5nKHByb3ApIHtcbiAgICByZXR1cm4gdHlwZW9mIHRoaXMucHJvcHNbcHJvcF0gPT09ICd1bmRlZmluZWQnIHx8XG4gICAgICAoSXRlcmFibGUuaXNJdGVyYWJsZSh0aGlzLnByb3BzW3Byb3BdKSAmJlxuICAgICAgdGhpcy5wcm9wc1twcm9wXS5nZXQoJ3BlbmRpbmcnKSA9PT0gdHJ1ZSlcbiAgfVxuICBpc1Byb3BFcnJvcmVkKHByb3ApIHtcbiAgICByZXR1cm4gSXRlcmFibGUuaXNJdGVyYWJsZSh0aGlzLnByb3BzW3Byb3BdKSAmJiB0aGlzLnByb3BzW3Byb3BdLmdldCgnZXJyb3InKSAhPSBudWxsXG4gIH1cbiAgaXNSZXNvbHZpbmcoKSB7XG4gICAgcmV0dXJuICF0aGlzLmlzRXJyb3JlZCgpICYmICF0aGlzLmdldFJlc29sdmluZ0ZpZWxkcygpLmlzRW1wdHkoKVxuICB9XG4gIGlzRXJyb3JlZCgpIHtcbiAgICByZXR1cm4gIXRoaXMuZ2V0RXJyb3JzKCkuaXNFbXB0eSgpXG4gIH1cbiAgZ2V0UmVzb2x2aW5nRmllbGRzKCkge1xuICAgIC8vIGhhcyBrZXlzIHRoYXQgYXJlIGVpdGhlciB1bmRlZmluZWQvbnVsbCBvciBoYXZlIGEgcGVuZGluZyA9IHRydWUga2V5XG4gICAgcmV0dXJuIGZyb21KUyh0aGlzLmNvbnN0cnVjdG9yLnN0b3JlUHJvcHMpLnJlZHVjZSgocHJldiwgY3Vyc29yLCBwcm9wKSA9PlxuICAgICAgdGhpcy5pc1Byb3BSZXNvbHZpbmcocHJvcCkgPyBwcmV2LnB1c2gocHJvcCkgOiBwcmV2XG4gICAgLCBMaXN0KCkpXG4gIH1cbiAgZ2V0RXJyb3JzKCkge1xuICAgIC8vIGhhcyBrZXlzIHRoYXQgaGF2ZSBhbiBlcnJvciA9IGRhdGEga2V5XG4gICAgcmV0dXJuIGZyb21KUyh0aGlzLmNvbnN0cnVjdG9yLnN0b3JlUHJvcHMpLnJlZHVjZSgocHJldiwgY3Vyc29yLCBwcm9wKSA9PlxuICAgICAgdGhpcy5pc1Byb3BFcnJvcmVkKHByb3ApXG4gICAgICAgID8gcHJldi5zZXQocHJvcCwgdGhpcy5wcm9wc1twcm9wXS5nZXQoJ2Vycm9yJykpXG4gICAgICAgIDogcHJldlxuICAgICwgTWFwKCkpXG4gIH1cbiAgZ2V0UmVzb2x2ZWREYXRhKCkge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLmNvbnN0cnVjdG9yLnN0b3JlUHJvcHMpLnJlZHVjZSgocHJldiwgcHJvcCkgPT4ge1xuICAgICAgY29uc3QgdmFsID0gdGhpcy5wcm9wc1twcm9wXVxuICAgICAgaWYgKCF0aGlzLmlzUHJvcFJlc29sdmluZyhwcm9wKSkge1xuICAgICAgICBwcmV2W3Byb3BdID0gSXRlcmFibGUuaXNJdGVyYWJsZSh2YWwpID8gdmFsLmdldCgnZGF0YScpIHx8IHZhbCA6IHZhbFxuICAgICAgfVxuICAgICAgcmV0dXJuIHByZXZcbiAgICB9LCB7fSlcbiAgfVxuXG4gIHJlbmRlckxvYWRlcigpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIHJlbmRlckVycm9ycygpIHtcbiAgICByZXR1cm4gbnVsbFxuICB9XG4gIHJlbmRlckRhdGEoKSB7XG4gICAgcmV0dXJuIG51bGxcbiAgfVxuXG4gIHRyeVJlc29sdmVEYXRhKCkge1xuICAgIGlmICghdGhpcy5yZXNvbHZlRGF0YSkgcmV0dXJuXG4gICAgY29uc3QgbG9hZGluZyA9IHRoaXMuZ2V0UmVzb2x2aW5nRmllbGRzKClcbiAgICBpZiAobG9hZGluZy5zaXplID09PSAwKSByZXR1cm5cbiAgICB0aGlzLnJlc29sdmVEYXRhKClcbiAgfVxuICBjb21wb25lbnRXaWxsTW91bnQoKSB7XG4gICAgdGhpcy50cnlSZXNvbHZlRGF0YSgpXG4gIH1cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIGlmICghdGhpcy5oYW5kbGVSZXNvbHZlZCkgcmV0dXJuXG4gICAgaWYgKHRoaXMuX3Jlc29sdmVkKSByZXR1cm5cbiAgICBjb25zdCBsb2FkaW5nID0gdGhpcy5nZXRSZXNvbHZpbmdGaWVsZHMoKVxuICAgIGlmIChsb2FkaW5nLnNpemUgIT09IDApIHJldHVyblxuXG4gICAgdGhpcy5fcmVzb2x2ZWQgPSB0cnVlXG4gICAgdGhpcy5oYW5kbGVSZXNvbHZlZCh0aGlzLmdldFJlc29sdmVkRGF0YSgpKVxuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIHJldHVybiB0aGlzLmlzUmVzb2x2aW5nKClcbiAgICAgID8gdGhpcy5yZW5kZXJMb2FkZXIodGhpcy5nZXRSZXNvbHZpbmdGaWVsZHMoKSlcbiAgICAgIDogdGhpcy5pc0Vycm9yZWQoKVxuICAgICAgICA/IHRoaXMucmVuZGVyRXJyb3JzKHRoaXMuZ2V0RXJyb3JzKCkpXG4gICAgICAgIDogdGhpcy5yZW5kZXJEYXRhKHRoaXMuZ2V0UmVzb2x2ZWREYXRhKCkpXG4gIH1cbn1cbiJdfQ==