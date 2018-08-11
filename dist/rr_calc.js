"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = React;
var ReactDOM = ReactDOM;
var PropTypes = PropTypes;
var _Redux = Redux,
    createStore = _Redux.createStore,
    applyMiddleware = _Redux.applyMiddleware,
    bindActionCreators = _Redux.bindActionCreators,
    combineReducers = _Redux.combineReducers,
    compose = _Redux.compose;
var _ReactRedux = ReactRedux,
    Provider = _ReactRedux.Provider,
    connect = _ReactRedux.connect;
var ReduxThunk = ReduxThunk.default;
var NUM_PAD_MAPPING = {
  'zero': '0',
  'decimal': '.',
  'one': '1',
  'two': '2',
  'three': '3',
  'four': '4',
  'five': '5',
  'six': '6',
  'seven': '7',
  'eight': '8',
  'nine': '9'
};
var MATH_PAD_MAPPING = {
  'add': '+',
  'subtract': '-',
  'multiply': '*',
  'divide': '/'
};
var ACTION_MAPPING = {
  'equals': '=',
  'clear': 'clr'
};
var AVAILABLE_OPERATIONS = [MATH_PAD_MAPPING['add'], MATH_PAD_MAPPING['subtract'], MATH_PAD_MAPPING['multiply'], MATH_PAD_MAPPING['divide']]; // Finds a Object Key by Value.

var getObjectKeyByValue = function getObjectKeyByValue(object, value) {
  return Object.keys(object).find(function (key) {
    return object[key] === value;
  });
};

var isNumeric = function isNumeric(value) {
  return !isNaN(value - parseFloat(value));
}; // Returns "Id" (Symbol) from KeyCode.


var getIdFromKeyCode = function getIdFromKeyCode(key) {
  switch (key) {
    case 107:
    case 187:
      return '+';

    case 109:
    case 189:
      return '-';

    case 106:
    case 88:
      return '*';

    case 111:
      return '/';

    case 44:
    case 46:
      return '.';

    case 127:
      return 'clr';

    case 13:
      return '=';

    default:
      return String.fromCharCode(event.keyCode);
  }
}; // Returns the "calculated" result.


var calculateResult = function calculateResult(display) {
  try {
    return String(eval(display));
  } catch (error) {
    return 'ERR';
  }
};

var DECIMAL_REGEX = /(\d+\.\d*)$/;
var SYMBOL_REGEX = /([+\-\*\/])$/; // Prevents certain changes (double-zeros or -decimals) and adds the operator
// only once before returning the new Display string.

var checkDisplayOperation = function checkDisplayOperation(oldDisplay, operator) {
  // Prevent multiple decimal points.
  if (operator === NUM_PAD_MAPPING["decimal"] && !DECIMAL_REGEX.test(oldDisplay) && !SYMBOL_REGEX.test(oldDisplay) && !oldDisplay.endsWith(NUM_PAD_MAPPING["decimal"])) {
    return oldDisplay + operator;
  }

  if (getObjectKeyByValue(MATH_PAD_MAPPING, operator)) {
    // Replace last operand if exists.
    var lastOperand = oldDisplay.slice(-1);

    if (AVAILABLE_OPERATIONS.indexOf(lastOperand) !== -1) {
      return oldDisplay.slice(0, -1) + operator;
    }

    return oldDisplay + operator;
  }

  if (isNumeric(operator)) {
    // Prevent double zeros before decimal and reset on Error.
    if (oldDisplay === '0' || oldDisplay === 'ERR') {
      return operator;
    }

    return oldDisplay + operator;
  }

  return oldDisplay;
}; // Main Connected Container renders Calculator according to state update.


var Calculator =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Calculator, _React$PureComponent);

  function Calculator() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Calculator);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Calculator)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidMount", function () {
      console.log('didMount:', _assertThisInitialized(_assertThisInitialized(_this)));
      document.addEventListener('keypress', _this.handleKeyPress);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentWillUnmount", function () {
      document.removeEventListener('keypress', _this.handleKeyPress);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "buttonClick", function (event) {
      var id = event.target.id;
      console.log(id);

      if (ACTION_MAPPING[id] === '=') {
        _this.props.calcDisplay(_this.display);
      }

      if (ACTION_MAPPING[id] === 'clr') {
        _this.props.clearDisplay();
      } else {
        _this.addInput(id);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleKeyPress", function (event) {
      var key = event.keyCode;
      console.log('key:', key);
      var id = getIdFromKeyCode(key);
      console.log('id:', id);

      if (id === '=') {
        _this.props.calcDisplay(_this.display);
      }

      if (id === 'clr') {
        _this.props.clearDisplay();
      } else {
        _this.addInput(id);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "addInput", function (id) {
      var numMatch = NUM_PAD_MAPPING[id] ? id : getObjectKeyByValue(NUM_PAD_MAPPING, id);

      if (numMatch) {
        console.log('numPad', NUM_PAD_MAPPING[numMatch]);

        _this.props.updateDisplay(NUM_PAD_MAPPING[numMatch]);
      }

      var mathMatch = MATH_PAD_MAPPING[id] ? id : getObjectKeyByValue(MATH_PAD_MAPPING, id);

      if (mathMatch) {
        console.log('mathPad', MATH_PAD_MAPPING[mathMatch]);

        _this.props.updateDisplay(MATH_PAD_MAPPING[mathMatch]);
      }
    });

    return _this;
  }

  _createClass(Calculator, [{
    key: "render",
    value: function render() {
      var currentDisplay = this.props.currentDisplay;
      /**
       *  [    id="display"     ]
       *  -----------------------
       *  [ numPad ][[ mathPad ]
       *  [        ] [ actPad  ]]
       */

      console.log('CalculatorChange:', this.props, this.state);
      return React.createElement("div", {
        id: "wrapper"
      }, React.createElement("div", {
        id: "calculator"
      }, React.createElement("div", {
        id: "display"
      }, currentDisplay), React.createElement("div", {
        id: "pads"
      }, React.createElement("div", {
        className: "num-pad"
      }, React.createElement(NumPad, {
        buttonClick: this.buttonClick
      })), React.createElement("div", null, React.createElement("div", {
        className: "math-pad"
      }, React.createElement(MathPad, {
        buttonClick: this.buttonClick
      })), React.createElement("div", {
        className: "act-pad"
      }, React.createElement(ActionPad, {
        buttonClick: this.buttonClick
      }))))));
    }
  }]);

  return Calculator;
}(React.PureComponent); // PropTypes for Calculator.


Calculator.propTypes = {
  currentDisplay: PropTypes.string
}; // Builds and returns the Number Pad.

var NumPad = function NumPad(_ref) {
  var buttonClick = _ref.buttonClick;
  return Object.keys(NUM_PAD_MAPPING).reverse().map(function (key, index) {
    return React.createElement(CalcButton, {
      key: index,
      buttonClick: buttonClick,
      id: key,
      triggerKey: NUM_PAD_MAPPING[key]
    });
  });
}; // PropTypes for NumPad.


NumPad.propTypes = {
  buttonClick: PropTypes.func.isRequired
}; // Builds and returns the Number Pad.

var MathPad = function MathPad(_ref2) {
  var buttonClick = _ref2.buttonClick;
  return Object.keys(MATH_PAD_MAPPING).map(function (key, index) {
    return React.createElement(CalcButton, {
      key: index,
      buttonClick: buttonClick,
      id: key,
      triggerKey: MATH_PAD_MAPPING[key]
    });
  });
}; // PropTypes for MathPad.


MathPad.propTypes = {
  buttonClick: PropTypes.func.isRequired
}; // Builds and returns the Action Pad.

var ActionPad = function ActionPad(_ref3) {
  var buttonClick = _ref3.buttonClick;
  return React.createElement(React.Fragment, null, React.createElement(CalcButton, {
    key: ACTION_MAPPING["equals"],
    buttonClick: buttonClick,
    id: "equals",
    triggerKey: ACTION_MAPPING["equals"]
  }), React.createElement(CalcButton, {
    key: ACTION_MAPPING["clear"],
    buttonClick: buttonClick,
    id: "clear",
    triggerKey: ACTION_MAPPING["clear"]
  }));
}; // PropTypes for ActionPad.


ActionPad.propTypes = {
  buttonClick: PropTypes.func.isRequired
}; // Builds and returns a single calculator button.

var CalcButton = function CalcButton(_ref4) {
  var id = _ref4.id,
      triggerKey = _ref4.triggerKey,
      buttonClick = _ref4.buttonClick,
      buttonStyle = _ref4.buttonStyle;
  return React.createElement("button", {
    id: id,
    onClick: buttonClick,
    className: "calc-button",
    style: buttonStyle
  }, triggerKey);
}; // PropTypes for CalcButton.


CalcButton.propTypes = {
  id: PropTypes.string.isRequired,
  triggerKey: PropTypes.string.isRequired,
  buttonClick: PropTypes.func.isRequired,
  buttonStyle: PropTypes.string
}; // Actions.

var UPDATE_DISPLAY = 'UPDATE_DISPLAY';
var CLEAR_DISPLAY = 'CLEAR_DISPLAY';
var CALCULATE_DISPLAY = 'CALCULATE_DISPLAY'; // Action Creators.

var updateDisplay = function updateDisplay(text) {
  return {
    type: UPDATE_DISPLAY,
    text: text
  };
};

var clearDisplay = function clearDisplay() {
  return {
    type: CLEAR_DISPLAY
  };
};

var calcDisplay = function calcDisplay() {
  return {
    type: CALCULATE_DISPLAY
  };
}; // Set up defaultState.


var defaultState = {
  currentDisplay: '0'
}; // Reducer - Updates Display.

var calcReducer = function calcReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  console.log('calcReducer:', state, action.type);

  switch (action.type) {
    case UPDATE_DISPLAY:
      console.log('update:', action);
      return _objectSpread({}, state, {
        currentDisplay: checkDisplayOperation(state.currentDisplay, action.text)
      });

    case CLEAR_DISPLAY:
      console.log('clear:', action);
      return _objectSpread({}, state, {
        currentDisplay: '0'
      });

    case CALCULATE_DISPLAY:
      console.log('calc:', action);
      return _objectSpread({}, state, {
        currentDisplay: calculateResult(state.currentDisplay)
      });

    default:
      return state;
  }
}; // Combine for easier access.


var reducer = combineReducers({
  calc: calcReducer
}); // Add Redux Dev-Tools if available.

var composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Create Store and set "preloadedState".

var store = createStore(reducer, {
  calc: _objectSpread({}, defaultState)
}, composeEnhancers(applyMiddleware(ReduxThunk))); // Extract state and map to props.

var mapStateToProps = function mapStateToProps(state, props) {
  return _objectSpread({}, state.calc);
}; // "Map" action Creator(s).


var actionCreators = {
  updateDisplay: updateDisplay,
  clearDisplay: clearDisplay,
  calcDisplay: calcDisplay
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}; // Connect and render.


var AppContainer = connect(mapStateToProps, mapDispatchToProps)(Calculator);
ReactDOM.render(React.createElement(Provider, {
  store: store
}, React.createElement(AppContainer, null)), document.getElementById('root'));
//# sourceMappingURL=rr_calc.js.map