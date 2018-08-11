"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

// coded by @no-stack-dub-sack (github) / @no_stack_sub_sack (codepen)

/** NOTES:
 /** Dependencies are React, ReactDOM, and
 Accurate_Interval.js by Squuege (external script
 to keep setInterval() from drifting over time &
 thus ensuring timer goes off at correct mark).
 /** Utilizes embedded <Audio> tag to ensure audio
 plays when timer tab is inactive or browser is
 minimized ( rather than new Audio().play() ).
 /** Audio of this fashion not supported on most
 mobile devices it would seem (bummer I know).
 **/
// PROJECTOR SELECTOR FOR EXTERNAL TEST SCRIPT:
var projectName = 'pomodoro-clock';
localStorage.setItem('example_project', 'Pomodoro Clock'); // COMPONENTS:

var TimerLengthControl =
/*#__PURE__*/
function (_React$Component) {
  _inherits(TimerLengthControl, _React$Component);

  function TimerLengthControl() {
    _classCallCheck(this, TimerLengthControl);

    return _possibleConstructorReturn(this, _getPrototypeOf(TimerLengthControl).apply(this, arguments));
  }

  _createClass(TimerLengthControl, [{
    key: "render",
    value: function render() {
      return React.createElement("div", {
        className: "length-control"
      }, React.createElement("div", {
        id: this.props.titleID
      }, this.props.title), React.createElement("button", {
        id: this.props.minID,
        className: "btn-level",
        value: "-",
        onClick: this.props.onClick
      }, React.createElement("i", {
        className: "fa fa-arrow-down fa-2x"
      })), React.createElement("div", {
        id: this.props.lengthID,
        className: "btn-level"
      }, this.props.length), React.createElement("button", {
        id: this.props.addID,
        className: "btn-level",
        value: "+",
        onClick: this.props.onClick
      }, React.createElement("i", {
        className: "fa fa-arrow-up fa-2x"
      })));
    }
  }]);

  return TimerLengthControl;
}(React.Component);

;

var Timer =
/*#__PURE__*/
function (_React$Component2) {
  _inherits(Timer, _React$Component2);

  function Timer(props) {
    var _this;

    _classCallCheck(this, Timer);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Timer).call(this, props));
    _this.state = {
      brkLength: 5,
      seshLength: 25,
      timerState: 'stopped',
      timerType: 'Session',
      timer: 1500,
      intervalID: '',
      alarmColor: {
        color: 'white'
      }
    };
    _this.setBrkLength = _this.setBrkLength.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.setSeshLength = _this.setSeshLength.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.lengthControl = _this.lengthControl.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.timerControl = _this.timerControl.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.beginCountDown = _this.beginCountDown.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.decrementTimer = _this.decrementTimer.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.phaseControl = _this.phaseControl.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.warning = _this.warning.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.buzzer = _this.buzzer.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.switchTimer = _this.switchTimer.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.clockify = _this.clockify.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    _this.reset = _this.reset.bind(_assertThisInitialized(_assertThisInitialized(_this)));
    return _this;
  }

  _createClass(Timer, [{
    key: "setBrkLength",
    value: function setBrkLength(e) {
      this.lengthControl('brkLength', e.currentTarget.value, this.state.brkLength, 'Session');
    }
  }, {
    key: "setSeshLength",
    value: function setSeshLength(e) {
      this.lengthControl('seshLength', e.currentTarget.value, this.state.seshLength, 'Break');
    }
  }, {
    key: "lengthControl",
    value: function lengthControl(stateToChange, sign, currentLength, timerType) {
      if (this.state.timerState == 'running') return;

      if (this.state.timerType == timerType) {
        if (sign == "-" && currentLength != 1) {
          this.setState(_defineProperty({}, stateToChange, currentLength - 1));
        } else if (sign == "+" && currentLength != 60) {
          this.setState(_defineProperty({}, stateToChange, currentLength + 1));
        }
      } else {
        if (sign == "-" && currentLength != 1) {
          var _this$setState3;

          this.setState((_this$setState3 = {}, _defineProperty(_this$setState3, stateToChange, currentLength - 1), _defineProperty(_this$setState3, "timer", currentLength * 60 - 60), _this$setState3));
        } else if (sign == "+" && currentLength != 60) {
          var _this$setState4;

          this.setState((_this$setState4 = {}, _defineProperty(_this$setState4, stateToChange, currentLength + 1), _defineProperty(_this$setState4, "timer", currentLength * 60 + 60), _this$setState4));
        }
      }
    }
  }, {
    key: "timerControl",
    value: function timerControl() {
      var control = this.state.timerState == 'stopped' ? (this.beginCountDown(), this.setState({
        timerState: 'running'
      })) : (this.setState({
        timerState: 'stopped'
      }), this.state.intervalID && this.state.intervalID.cancel());
    }
  }, {
    key: "beginCountDown",
    value: function beginCountDown() {
      var _this2 = this;

      this.setState({
        intervalID: accurateInterval(function () {
          _this2.decrementTimer();

          _this2.phaseControl();
        }, 1000)
      });
    }
  }, {
    key: "decrementTimer",
    value: function decrementTimer() {
      this.setState({
        timer: this.state.timer - 1
      });
    }
  }, {
    key: "phaseControl",
    value: function phaseControl() {
      var timer = this.state.timer;
      this.warning(timer);
      this.buzzer(timer);

      if (timer < 0) {
        this.state.timerType == 'Session' ? (this.state.intervalID && this.state.intervalID.cancel(), this.beginCountDown(), this.switchTimer(this.state.brkLength * 60, 'Break')) : (this.state.intervalID && this.state.intervalID.cancel(), this.beginCountDown(), this.switchTimer(this.state.seshLength * 60, 'Session'));
      }
    }
  }, {
    key: "warning",
    value: function warning(_timer) {
      var warn = _timer < 61 ? this.setState({
        alarmColor: {
          color: '#a50d0d'
        }
      }) : this.setState({
        alarmColor: {
          color: 'white'
        }
      });
    }
  }, {
    key: "buzzer",
    value: function buzzer(_timer) {
      if (_timer === 0) {
        this.audioBeep.play();
      }
    }
  }, {
    key: "switchTimer",
    value: function switchTimer(num, str) {
      this.setState({
        timer: num,
        timerType: str,
        alarmColor: {
          color: 'white'
        }
      });
    }
  }, {
    key: "clockify",
    value: function clockify() {
      var minutes = Math.floor(this.state.timer / 60);
      var seconds = this.state.timer - minutes * 60;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      minutes = minutes < 10 ? '0' + minutes : minutes;
      return minutes + ':' + seconds;
    }
  }, {
    key: "reset",
    value: function reset() {
      this.setState({
        brkLength: 5,
        seshLength: 25,
        timerState: 'stopped',
        timerType: 'Session',
        timer: 1500,
        intervalID: '',
        alarmColor: {
          color: 'white'
        }
      });
      this.state.intervalID && this.state.intervalID.cancel();
      this.audioBeep.pause();
      this.audioBeep.currentTime = 0;
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return React.createElement("div", null, React.createElement("div", {
        className: "main-title"
      }, "Pomodoro Clock"), React.createElement(TimerLengthControl, {
        titleID: "break-label",
        minID: "break-decrement",
        addID: "break-increment",
        lengthID: "break-length",
        title: "Break Length",
        onClick: this.setBrkLength,
        length: this.state.brkLength
      }), React.createElement(TimerLengthControl, {
        titleID: "session-label",
        minID: "session-decrement",
        addID: "session-increment",
        lengthID: "session-length",
        title: "Session Length",
        onClick: this.setSeshLength,
        length: this.state.seshLength
      }), React.createElement("div", {
        className: "timer",
        style: this.state.alarmColor
      }, React.createElement("div", {
        className: "timer-wrapper"
      }, React.createElement("div", {
        id: "timer-label"
      }, this.state.timerType), React.createElement("div", {
        id: "time-left"
      }, this.clockify()))), React.createElement("div", {
        className: "timer-control"
      }, React.createElement("button", {
        id: "start_stop",
        onClick: this.timerControl
      }, React.createElement("i", {
        className: "fa fa-play fa-2x"
      }), React.createElement("i", {
        className: "fa fa-pause fa-2x"
      })), React.createElement("button", {
        id: "reset",
        onClick: this.reset
      }, React.createElement("i", {
        className: "fa fa-refresh fa-2x"
      }))), React.createElement("div", {
        className: "author"
      }, " Designed and Coded by ", React.createElement("br", null), React.createElement("a", {
        target: "_blank",
        href: "https://goo.gl/6NNLMG"
      }, "Peter Weinberg")), React.createElement("audio", {
        id: "beep",
        preload: "auto",
        src: "https://goo.gl/65cBl1",
        ref: function ref(audio) {
          _this3.audioBeep = audio;
        }
      }));
    }
  }]);

  return Timer;
}(React.Component);

;
ReactDOM.render(React.createElement(Timer, null), document.getElementById('app'));
//# sourceMappingURL=rr_test_pomo.js.map