'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _CSSClassnames = require('../../../utils/CSSClassnames');

var _CSSClassnames2 = _interopRequireDefault(_CSSClassnames);

var _Intl = require('../../../utils/Intl');

var _Intl2 = _interopRequireDefault(_Intl);

var _Props = require('../../../utils/Props');

var _Props2 = _interopRequireDefault(_Props);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

var CLASS_ROOT = _CSSClassnames2.default.CONTROL_ICON;
var COLOR_INDEX = _CSSClassnames2.default.COLOR_INDEX;

var Icon = function (_Component) {
  _inherits(Icon, _Component);

  function Icon() {
    _classCallCheck(this, Icon);

    return _possibleConstructorReturn(this, (Icon.__proto__ || Object.getPrototypeOf(Icon)).apply(this, arguments));
  }

  _createClass(Icon, [{
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          className = _props.className,
          colorIndex = _props.colorIndex;
      var _props2 = this.props,
          a11yTitle = _props2.a11yTitle,
          size = _props2.size,
          responsive = _props2.responsive;
      var intl = this.context.intl;


      var classes = (0, _classnames3.default)(CLASS_ROOT, CLASS_ROOT + '-elevator', className, (_classnames = {}, _defineProperty(_classnames, CLASS_ROOT + '--' + size, size), _defineProperty(_classnames, CLASS_ROOT + '--responsive', responsive), _defineProperty(_classnames, COLOR_INDEX + '-' + colorIndex, colorIndex), _classnames));

      a11yTitle = a11yTitle || _Intl2.default.getMessage(intl, 'elevator');

      var restProps = _Props2.default.omit(this.props, Object.keys(Icon.propTypes));
      return _react2.default.createElement(
        'svg',
        _extends({}, restProps, { version: '1.1', viewBox: '0 0 24 24', width: '24px', height: '24px', role: 'img', className: classes, 'aria-label': a11yTitle }),
        _react2.default.createElement('path', { fill: 'none', stroke: '#000', strokeLinecap: 'round', strokeWidth: '2', d: 'M1,2.991155 C1,1.89147046 1.88967395,1 2.991155,1 L21.008845,1 C22.1085295,1 23,1.88967395 23,2.991155 L23,21.008845 C23,22.1085295 22.1103261,23 21.008845,23 L2.991155,23 C1.89147046,23 1,22.1103261 1,21.008845 L1,2.991155 Z M16.5,8 L18,10 L15,10 L16.5,8 Z M16.5,16 L18,14 L15,14 L16.5,16 Z M5,13 L6.55613518,9.88772964 C6.80127495,9.3974501 7.44386482,9 8,9 L8,9 C8.55228475,9 9.19907951,9.39815903 9.44386482,9.88772964 L11,13 M6.5,18 L7.75,10 L8,10 L8.25,10 L9.5,18 M8,7 C8.55228475,7 9,6.55228475 9,6 C9,5.44771525 8.55228475,5 8,5 C7.44771525,5 7,5.44771525 7,6 C7,6.55228475 7.44771525,7 8,7 Z' })
      );
    }
  }]);

  return Icon;
}(_react.Component);

Icon.displayName = 'Icon';
exports.default = Icon;
;

Icon.contextTypes = {
  intl: _propTypes2.default.object
};

Icon.defaultProps = {
  responsive: true
};

Icon.displayName = 'Elevator';

Icon.icon = true;

Icon.propTypes = {
  a11yTitle: _propTypes2.default.string,
  colorIndex: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(['xsmall', 'small', 'medium', 'large', 'xlarge', 'huge']),
  responsive: _propTypes2.default.bool
};
module.exports = exports['default'];