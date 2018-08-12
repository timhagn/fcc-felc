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
var timer = null; // Main Connected Container renders Pomodoro Clock according to state updates.

var Pomodoro =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(Pomodoro, _React$PureComponent);

  function Pomodoro(props) {
    var _this;

    _classCallCheck(this, Pomodoro);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Pomodoro).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "buttonClick", function (event) {
      var id = event.target.id || event.target.parentElement.id;
      console.log(id);

      if (ACTION_MAPPING[id]) {
        _this.props.mappedClick(id);
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "startStopClick", function () {
      console.log(_this.props.timerRunning);

      if (!_this.props.timerRunning) {
        _this.props.startTimer();
      } else {
        _this.props.stopTimer();
      }
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "resetClick", function (event) {
      _this.beep.pause();

      _this.beep.currentTime = 0;

      _this.props.stopTimer();

      _this.buttonClick(event);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleExpired", function () {
      _this.beep.currentTime = 0;

      _this.beep.play();
    });

    _this.beep = undefined;
    return _this;
  } // Button Handlers.


  _createClass(Pomodoro, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          timeLeft = _this$props.timeLeft,
          breakLength = _this$props.breakLength,
          sessionLength = _this$props.sessionLength,
          breakTimer = _this$props.breakTimer;
      console.log('PomodoroChange:', this.props, this.state);
      return React.createElement("div", {
        id: "wrapper"
      }, React.createElement("div", {
        id: "pomodoro"
      }, React.createElement("div", {
        className: "main-title"
      }, "Pomodoro Clock"), React.createElement(TimerDisplay, {
        timeLeft: timeLeft,
        breakTimer: breakTimer,
        handleExpired: this.handleExpired
      }), React.createElement(BreakLengthControl, {
        buttonClick: this.buttonClick,
        breakLength: breakLength
      }), React.createElement(SessionLengthControl, {
        buttonClick: this.buttonClick,
        sessionLength: sessionLength
      }), React.createElement(TimerControl, {
        startStopClick: this.startStopClick,
        resetClick: this.resetClick
      }), React.createElement("div", {
        className: "developer"
      }, "Developed (and \"styled\" % ) by Tim Hagn."), React.createElement(AudioBeep, {
        ref: function ref(el) {
          return _this2.beep = el;
        },
        id: "beep",
        sample: "https://soundbible.com/mp3/Music_Box-Big_Daddy-1389738694.mp3"
      })));
    }
  }]);

  return Pomodoro;
}(React.PureComponent); // PropTypes for Pomodoro.


Pomodoro.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  timerRunning: PropTypes.bool.isRequired,
  breakLength: PropTypes.number.isRequired,
  sessionLength: PropTypes.number.isRequired,
  breakTimer: PropTypes.bool.isRequired
}; // Builds and returns the Timer Display.

var TimerDisplay = function TimerDisplay(_ref) {
  var timeLeft = _ref.timeLeft,
      handleExpired = _ref.handleExpired,
      breakTimer = _ref.breakTimer;
  var minutes = parseInt(timeLeft / 60, 10);
  var seconds = parseInt(timeLeft - minutes * 60, 10);
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  var timerDisplay = minutes + ":" + seconds;
  var timerLabel = breakTimer ? 'Break' : 'Session';
  var backgroundClass = breakTimer ? 'timer-wrapper timer-break' : 'timer-wrapper';

  if (timeLeft === 0) {
    handleExpired();
  }

  return React.createElement("div", {
    className: "timer"
  }, React.createElement("div", {
    className: backgroundClass
  }, React.createElement("div", {
    id: "timer-label"
  }, timerLabel), React.createElement("div", {
    id: "time-left"
  }, timerDisplay)));
}; // PropTypes for TimerDisplay.


TimerDisplay.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  breakTimer: PropTypes.bool.isRequired,
  handleExpired: PropTypes.func.isRequired
}; // Builds and returns the Audio Element.

var AudioBeep = React.forwardRef(function (_ref2, ref) {
  var id = _ref2.id,
      sample = _ref2.sample;
  return React.createElement(React.Fragment, null, React.createElement("audio", {
    ref: ref,
    id: id,
    src: sample,
    preload: "auto"
  }));
}); // PropTypes for DrumPad.

AudioBeep.propTypes = {
  id: PropTypes.string.isRequired,
  sample: PropTypes.string.isRequired
}; // Builds and returns the Break Length Control.

var BreakLengthControl = function BreakLengthControl(_ref3) {
  var buttonClick = _ref3.buttonClick,
      breakLength = _ref3.breakLength;
  return React.createElement("div", {
    className: "length-control"
  }, React.createElement("div", {
    id: "break-label"
  }, "Break Length"), React.createElement(TimerButton, {
    id: "break-decrement",
    className: "btn-level",
    value: "-",
    buttonClick: buttonClick
  }, React.createElement("i", {
    className: "far fa-minus-square"
  })), React.createElement("div", {
    id: "break-length"
  }, breakLength), React.createElement(TimerButton, {
    id: "break-increment",
    className: "btn-level",
    value: "+",
    buttonClick: buttonClick
  }, React.createElement("i", {
    className: "far fa-plus-square"
  })));
}; // PropTypes for BreakLengthControl.


BreakLengthControl.propTypes = {
  buttonClick: PropTypes.func.isRequired,
  breakLength: PropTypes.number.isRequired
}; // Builds and returns the Session Length Control.

var SessionLengthControl = function SessionLengthControl(_ref4) {
  var buttonClick = _ref4.buttonClick,
      sessionLength = _ref4.sessionLength;
  return React.createElement("div", {
    className: "length-control"
  }, React.createElement("div", {
    id: "session-label"
  }, "Session Length"), React.createElement(TimerButton, {
    id: "session-decrement",
    className: "btn-level",
    value: "-",
    buttonClick: buttonClick
  }, React.createElement("i", {
    className: "far fa-minus-square"
  })), React.createElement("div", {
    id: "session-length"
  }, sessionLength), React.createElement(TimerButton, {
    id: "session-increment",
    className: "btn-level",
    value: "+",
    buttonClick: buttonClick
  }, React.createElement("i", {
    className: "far fa-plus-square"
  })));
}; // PropTypes for SessionLengthControl.


SessionLengthControl.propTypes = {
  buttonClick: PropTypes.func.isRequired,
  sessionLength: PropTypes.number.isRequired
}; // Builds and returns the Timer Main Control.

var TimerControl = function TimerControl(_ref5) {
  var startStopClick = _ref5.startStopClick,
      resetClick = _ref5.resetClick;
  return React.createElement("div", {
    className: "timer-control"
  }, React.createElement(TimerButton, {
    id: "start_stop",
    className: "btn-level",
    buttonClick: startStopClick
  }, React.createElement("i", {
    className: "fas fa-stopwatch"
  })), React.createElement(TimerButton, {
    id: "reset",
    className: "btn-level",
    buttonClick: resetClick
  }, React.createElement("i", {
    className: "fas fa-history"
  })));
}; // PropTypes for ActionPad.


TimerControl.propTypes = {
  startStopClick: PropTypes.func.isRequired,
  resetClick: PropTypes.func.isRequired
}; // Builds and returns a single Timer button.

var TimerButton = function TimerButton(_ref6) {
  var id = _ref6.id,
      className = _ref6.className,
      value = _ref6.value,
      buttonClick = _ref6.buttonClick,
      children = _ref6.children;
  return React.createElement("button", {
    id: id,
    onClick: buttonClick,
    className: className,
    value: value
  }, children);
}; // PropTypes for TimerButton.


TimerButton.propTypes = {
  id: PropTypes.string.isRequired,
  buttonClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  value: PropTypes.string
}; // Actions.

var BREAK_DECREMENT = 'BREAK_DECREMENT';
var BREAK_INCREMENT = 'BREAK_INCREMENT';
var SESSION_DECREMENT = 'SESSION_DECREMENT';
var SESSION_INCREMENT = 'SESSION_INCREMENT';
var START_STOP = 'START_STOP';
var RESET = 'RESET';
var TIMER_TICK = 'TIMER_TICK';
var TIMER_START = 'TIMER_START';
var TIMER_STOP = 'TIMER_STOP';
var START_BREAK = 'START_BREAK';
var STOP_BREAK = 'STOP_BREAK';
var ACTION_MAPPING = {
  'break-decrement': BREAK_DECREMENT,
  'break-increment': BREAK_INCREMENT,
  'session-decrement': SESSION_DECREMENT,
  'session-increment': SESSION_INCREMENT,
  'start_stop': START_STOP,
  'reset': RESET
}; // Action creators.

var mappedClick = function mappedClick(id) {
  console.log(id);
  return {
    type: ACTION_MAPPING[id]
  };
};

var startTimer = function startTimer() {
  return function (dispatch, getState) {
    clearInterval(timer);
    timer = setInterval(function () {
      var state = getState();

      if (state.pomodoro.timeLeft === 0) {
        if (state.pomodoro.breakTimer) {
          dispatch(stopBreak());
        } else {
          dispatch(startBreak());
        }
      }

      dispatch(tick());
    }, 1000);
    dispatch({
      type: TIMER_START
    });
  };
};

var tick = function tick() {
  return {
    type: TIMER_TICK
  };
};

var stopTimer = function stopTimer() {
  clearInterval(timer);
  return {
    type: TIMER_STOP
  };
};

var startBreak = function startBreak() {
  return {
    type: START_BREAK
  };
};

var stopBreak = function stopBreak() {
  return {
    type: STOP_BREAK
  };
}; // Set up defaultState.


var defaultState = {
  breakLength: 5,
  sessionLength: 25,
  timeLeft: 60 * 25,
  timerRunning: false,
  breakTimer: false
}; // Reducer - Updates Display.

var pomodoroReducer = function pomodoroReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  console.log('pomodoroReducer:', state, action.type);

  switch (action.type) {
    case BREAK_DECREMENT:
      console.log('BREAK_DECREMENT:', action);
      var decrementedBreakLength = state.breakLength - 1 < 1 ? state.breakLength : state.breakLength - 1;
      return _objectSpread({}, state, {
        breakLength: decrementedBreakLength
      });

    case BREAK_INCREMENT:
      var incrementedBreakLength = state.breakLength + 1 > 60 ? state.breakLength : state.breakLength + 1;
      console.log('BREAK_INCREMENT:', action);
      return _objectSpread({}, state, {
        breakLength: incrementedBreakLength
      });

    case SESSION_DECREMENT:
      console.log('SESSION_DECREMENT:', action);
      var decrementedSessionLength = state.sessionLength - 1 < 1 ? state.sessionLength : state.sessionLength - 1;
      var decrementedTime = state.timeLeft - 60 < 60 ? state.timeLeft : state.timeLeft - 60;
      return _objectSpread({}, state, {
        sessionLength: decrementedSessionLength,
        timeLeft: decrementedTime
      });

    case SESSION_INCREMENT:
      console.log('SESSION_INCREMENT:', action);
      var incrementedSessionLength = state.sessionLength + 1 > 60 ? state.sessionLength : state.sessionLength + 1;
      var incrementedTime = state.timeLeft + 60 > 60 * 60 ? state.timeLeft : state.timeLeft + 60;
      return _objectSpread({}, state, {
        sessionLength: incrementedSessionLength,
        timeLeft: incrementedTime
      });

    case TIMER_START:
      console.log('TIMER_START:', action);
      return _objectSpread({}, state, {
        timerRunning: true
      });

    case TIMER_STOP:
      console.log('TIMER_STOP:', action);
      return _objectSpread({}, state, {
        timerRunning: false
      });

    case TIMER_TICK:
      console.log('TIMER_TICK:', action);
      var timeLeft = state.timeLeft - 1 < 0 ? state.timeLeft : state.timeLeft - 1;
      return _objectSpread({}, state, {
        timeLeft: timeLeft
      });

    case START_BREAK:
      // Plus 1 to counter the next TIMER_TICK - only to get the _exact_ result
      // wanted in the tests -.-
      return _objectSpread({}, state, {
        timeLeft: state.breakLength * 60 + 1,
        breakTimer: true
      });

    case STOP_BREAK:
      // Plus 1 to counter the next TIMER_TICK - only to get the _exact_ result
      // wanted in the tests -.-
      return _objectSpread({}, state, {
        timeLeft: state.sessionLength * 60 + 1,
        breakTimer: false
      });

    case RESET:
      console.log('RESET:', action);
      return _objectSpread({}, state, defaultState);

    default:
      return state;
  }
}; // Combine for easier access.


var reducer = combineReducers({
  pomodoro: pomodoroReducer
}); // Add Redux Dev-Tools if available.

var composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Create Store and set "preloadedState".

var store = createStore(reducer, {
  pomodoro: _objectSpread({}, defaultState)
}, composeEnhancers(applyMiddleware(ReduxThunk))); // Extract state and map to props.

var mapStateToProps = function mapStateToProps(state, props) {
  return _objectSpread({}, state.pomodoro);
}; // "Map" action Creator(s).


var actionCreators = {
  mappedClick: mappedClick,
  startTimer: startTimer,
  stopTimer: stopTimer
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}; // Connect and render.


var AppContainer = connect(mapStateToProps, mapDispatchToProps)(Pomodoro);
ReactDOM.render(React.createElement(Provider, {
  store: store
}, React.createElement(AppContainer, null)), document.getElementById('root'));