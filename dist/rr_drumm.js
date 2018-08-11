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
var LMMS_URL = 'https://raw.githubusercontent.com/LMMS/assets/master/Samples/Sample%20library/Drums/';
var triggerKeys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']; // Main Connected Container renders Drum Machine according to state update.

var DrumMachine =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(DrumMachine, _React$PureComponent);

  function DrumMachine(props) {
    var _this;

    _classCallCheck(this, DrumMachine);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(DrumMachine).call(this, props));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidMount", function () {
      console.log('didMount:', _assertThisInitialized(_assertThisInitialized(_this)));
      document.addEventListener('keydown', _this.handleKeyPress);

      _this.props.fetchSamples();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentWillUnmount", function () {
      document.removeEventListener('keydown', _this.handleKeyPress);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "playSampleClick", function (event) {
      var id = event.target.firstElementChild.id;

      _this.playDrumPad(id);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleKeyPress", function (event) {
      var id = String.fromCharCode(event.keyCode);

      _this.playDrumPad(id);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "playDrumPad", function (id) {
      if (_this.drumPads[id]) {
        console.log('play', _this.drumPads[id]);

        _this.props.updateDisplay(_this.drumPads[id].getAttribute('name'));

        _this.drumPads[id].currentTime = 0;

        _this.drumPads[id].play();
      }
    });

    _this.drumPads = [];
    return _this;
  }

  _createClass(DrumMachine, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _this$props = this.props,
          sampleList = _this$props.sampleList,
          isFetching = _this$props.isFetching,
          lastUpdated = _this$props.lastUpdated,
          currentDisplay = _this$props.currentDisplay;

      if (isFetching === true) {
        console.log('DrumMachineFetching:', this.props);
        return React.createElement("div", {
          className: "wrapper"
        }, "Loading...");
      } else {
        var DrumPads = Object.keys(sampleList).map(function (key, index) {
          if (index < 9) {
            return React.createElement(DrumPad, {
              ref: function ref(el) {
                return _this2.drumPads[triggerKeys[index]] = el;
              },
              key: index,
              playSampleClick: _this2.playSampleClick,
              sampleName: sampleList[key][1].sampleName,
              triggerKey: triggerKeys[index],
              sample: sampleList[key][1].sample
            });
          }
        });
        console.log('DrumMachineChange:', this.props, this.state);
        return React.createElement("div", {
          id: "wrapper"
        }, React.createElement("div", {
          className: "drum-box",
          id: "drum-machine"
        }, React.createElement("div", {
          className: "drum-box",
          id: "display"
        }, currentDisplay || 'DRUM ON!'), DrumPads));
      }
    }
  }]);

  return DrumMachine;
}(React.PureComponent); // PropTypes for RandomQuotes.


DrumMachine.propTypes = {
  sampleList: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number.isRequired,
  currentDisplay: PropTypes.string
}; // Builds and returns a single drum pad.

var DrumPad = React.forwardRef(function (_ref, ref) {
  var sampleName = _ref.sampleName,
      triggerKey = _ref.triggerKey,
      sample = _ref.sample,
      playSampleClick = _ref.playSampleClick,
      padStyle = _ref.padStyle;
  return React.createElement("button", {
    id: sampleName,
    onClick: playSampleClick,
    className: "calc-button",
    style: padStyle
  }, React.createElement("audio", {
    ref: ref,
    className: "clip",
    id: triggerKey,
    src: sample,
    name: sampleName,
    preload: "auto"
  }), triggerKey);
}); // PropTypes for DrumPad.

DrumPad.propTypes = {
  sampleName: PropTypes.string.isRequired,
  triggerKey: PropTypes.string.isRequired,
  sample: PropTypes.string.isRequired,
  playSampleClick: PropTypes.func.isRequired,
  padStyle: PropTypes.string
}; // Actions.

var REQUEST_SAMPLES = 'REQUEST_SAMPLES';
var ERROR_SAMPLES = 'ERROR_SAMPLES';
var RECEIVE_SAMPLES = 'RECEIVE_SAMPLES';
var UPDATE_DISPLAY = 'UPDATE_DISPLAY'; // Action Providers.

var requestSamples = function requestSamples() {
  return {
    type: REQUEST_SAMPLES
  };
};

var errorSamples = function errorSamples() {
  return {
    type: ERROR_SAMPLES
  };
};

var receiveSamples = function receiveSamples(json) {
  console.log(json);
  var sampleList = {},
      lastInstrument = '';
  json.tree.map(function (item) {
    if (item.type === 'tree') {
      lastInstrument = item.path;
      sampleList[item.path] = [];
    } else {
      sampleList[lastInstrument].push({
        sample: LMMS_URL + item.path,
        sampleName: item.path.replace(lastInstrument + '/', '').replace('.flac', '')
      });
    }
  });
  console.log(sampleList);
  return {
    type: RECEIVE_SAMPLES,
    sampleList: sampleList,
    receivedAt: Date.now()
  };
};

var fetchSamples = function fetchSamples() {
  return function (dispatch) {
    dispatch(requestSamples()); // Fetch the Sample list from LMMS assets (CC0).
    // (https://github.com/LMMS/assets/tree/master/Samples/Sample%20library/Drums)

    var samplesRequest = new Request('https://api.github.com/repos/LMMS/assets/git/trees/fef895eb405c2a7aad48679dd5b43fed3c1dd3bc?recursive=true');
    console.log(samplesRequest);
    return fetch(samplesRequest).then(function (response) {
      return response.json();
    }, function (error) {
      return console.log('An error occurred.', error);
    }).then(function (json) {
      return json ? dispatch(receiveSamples(json)) : dispatch(errorSamples(json));
    });
  };
};

var updateDisplay = function updateDisplay(text) {
  return {
    type: UPDATE_DISPLAY,
    text: text
  };
}; // Set up defaultState.


var defaultState = {
  isFetching: false,
  sampleList: {},
  lastUpdated: 0,
  currentDisplay: ''
}; // Reducer - Fetches and returns quotes.

var samplesReducer = function samplesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  console.log('samplesReducer:', state, action.type);

  switch (action.type) {
    case REQUEST_SAMPLES:
      console.log('requested');
      return _objectSpread({}, state, {
        isFetching: true
      });

    case RECEIVE_SAMPLES:
      console.log('received');
      return _objectSpread({}, state, {
        isFetching: false,
        sampleList: action.sampleList,
        lastUpdated: action.receivedAt
      });

    case UPDATE_DISPLAY:
      console.log('display:', action);
      return _objectSpread({}, state, {
        currentDisplay: action.text
      });

    case ERROR_SAMPLES:
    default:
      return state;
  }
}; // Combine for easier access.


var reducer = combineReducers({
  samples: samplesReducer
}); // Add Redux Dev-Tools if available.

var composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Create Store and set "preloadedState".

var store = createStore(reducer, {
  samples: _objectSpread({}, defaultState)
}, composeEnhancers(applyMiddleware(ReduxThunk))); // Extract quotes and map to props.

var mapStateToProps = function mapStateToProps(state, props) {
  return _objectSpread({}, state.samples);
}; // "Map" action Creator(s).


var actionCreators = {
  fetchSamples: fetchSamples,
  updateDisplay: updateDisplay
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}; // Connect and render.


var AppContainer = connect(mapStateToProps, mapDispatchToProps)(DrumMachine);
ReactDOM.render(React.createElement(Provider, {
  store: store
}, React.createElement(AppContainer, null)), document.getElementById('root'));
//# sourceMappingURL=rr_drumm.js.map