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
var ReduxThunk = ReduxThunk.default; // Helper function to strip all html to text.

var strip = function strip(html) {
  return new DOMParser().parseFromString(html, 'text/html').body.textContent.replace(/(<([^>]+)>)/ig, '').trim();
}; // Main Connected Container renders QuoteBox according to state update.


var RandomQuotes =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(RandomQuotes, _React$PureComponent);

  function RandomQuotes() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, RandomQuotes);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(RandomQuotes)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidMount", function () {
      console.log('didMount:', _assertThisInitialized(_assertThisInitialized(_this)));

      _this.props.fetchQuotes();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleNewQuoteClick", function (event) {
      event.preventDefault();

      _this.props.fetchQuotes();
    });

    return _this;
  }

  _createClass(RandomQuotes, [{
    key: "render",
    value: function render() {
      console.log('RandomQuotes:', this.props);
      var _this$props = this.props,
          quote = _this$props.quote,
          author = _this$props.author,
          isFetching = _this$props.isFetching,
          lastUpdated = _this$props.lastUpdated;

      if (isFetching === true) {
        console.log('RandomQuotesFetching:', this.props);
        return React.createElement("div", {
          className: "Home"
        }, React.createElement(QuoteBox, {
          className: "Home-intro",
          newQuoteClick: this.handleNewQuoteClick,
          author: 'Last updated: ' + new Date(lastUpdated).toString(),
          quote: 'Loading...'
        }));
      } else {
        console.log('RandomQuotesChange:', this.props);
        return React.createElement("div", {
          className: "Home"
        }, React.createElement(QuoteBox, {
          className: "Home-intro",
          newQuoteClick: this.handleNewQuoteClick,
          author: author,
          quote: quote
        }));
      }
    }
  }]);

  return RandomQuotes;
}(React.PureComponent); // PropTypes for RandomQuotes.


RandomQuotes.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number.isRequired
}; // Builds and returns the QuoteBox button.

var QuoteBox = function QuoteBox(_ref) {
  var quote = _ref.quote,
      author = _ref.author,
      newQuoteClick = _ref.newQuoteClick;
  console.log('QuoteBox: ', quote, author);
  return React.createElement("div", {
    id: "wrapper"
  }, React.createElement("div", {
    id: "quote-box"
  }, React.createElement("div", {
    className: "quote-text",
    id: "text"
  }, React.createElement("i", {
    className: "fa fa-quote-left"
  }, " "), quote || 'Here should be a quote...'), React.createElement("div", {
    className: "quote-author",
    id: "author"
  }, author || 'A-NONE-NYMOUS'), React.createElement("div", {
    className: "buttons"
  }, React.createElement(TweetIt, {
    quote: quote,
    author: author
  }), React.createElement("button", {
    className: "button",
    id: "new-quote",
    onClick: newQuoteClick
  }, "New quote"))));
}; // PropTypes for QuoteBox.


QuoteBox.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  newQuoteClick: PropTypes.func.isRequired
}; // Builds and returns Tweet button.

var TweetIt = function TweetIt(_ref2) {
  var quote = _ref2.quote,
      author = _ref2.author;
  var hashtags = '100DaysOfCode,freeCodeCamp,RandomQuotes',
      text = encodeURI("".concat(quote, " - ").concat(author, "\n")),
      query = "text=".concat(text, "&url=\"").concat(location.href, "\"&hashtags=").concat(hashtags),
      href = "https://twitter.com/intent/tweet?".concat(query);
  return React.createElement("a", {
    className: "button",
    id: "tweet-quote",
    title: "Tweet this quote!",
    target: "_blank",
    href: href
  }, React.createElement("i", {
    className: "fab fa-twitter-square"
  }));
}; // PropTypes for TweetIt.


TweetIt.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
}; // Actions.

var REQUEST_QUOTES = 'REQUEST_QUOTES';
var ERROR_QUOTES = 'ERROR_QUOTES';
var RECEIVE_QUOTES = 'RECEIVE_QUOTES'; // Action Providers.

var requestQuotes = function requestQuotes() {
  return {
    type: REQUEST_QUOTES
  };
};

var errorQuotes = function errorQuotes() {
  return {
    type: ERROR_QUOTES
  };
};

var receiveQuotes = function receiveQuotes(json) {
  console.log(json);
  var randNum = Math.floor(Math.random() * 10);
  var _json$randNum = json[randNum],
      quote = _json$randNum.content,
      author = _json$randNum.title;
  console.log('receiveQuotes():', strip(quote), author);
  return {
    type: RECEIVE_QUOTES,
    quote: strip(quote),
    author: author,
    receivedAt: Date.now()
  };
};

var fetchQuotes = function fetchQuotes() {
  return function (dispatch) {
    dispatch(requestQuotes());
    var quotesRequest = new Request("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10&callback=");
    console.log(quotesRequest);
    return fetch(quotesRequest).then(function (response) {
      return response.json();
    }, function (error) {
      return console.log('An error occurred.', error);
    }).then(function (json) {
      return json ? dispatch(receiveQuotes(json)) : dispatch(errorQuotes(json));
    });
  };
}; // Set up defaultState.


var defaultState = {
  isFetching: false,
  author: '',
  quote: '',
  lastUpdated: 0
}; // Reducer - Fetches and returns quotes.

var quotesReducer = function quotesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;
  console.log('quotesReducer:', state, action.type);

  switch (action.type) {
    case REQUEST_QUOTES:
      console.log('requested');
      return _objectSpread({}, state, {
        isFetching: true
      });

    case RECEIVE_QUOTES:
      console.log('received');
      return _objectSpread({}, state, {
        isFetching: false,
        quote: action.quote,
        author: action.author,
        lastUpdated: action.receivedAt
      });

    case ERROR_QUOTES:
    default:
      return state;
  }
}; // Combine for easier access.


var reducer = combineReducers({
  quotes: quotesReducer
}); // Add Redux Dev-Tools if available.

var composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Create Store and set "preloadedState".

var store = createStore(reducer, {
  quotes: _objectSpread({}, defaultState)
}, composeEnhancers(applyMiddleware(ReduxThunk))); // Extract quotes and map to props.

var mapStateToProps = function mapStateToProps(state, props) {
  return _objectSpread({}, state.quotes);
}; // "Map" action Creator(s).


var actionCreators = {
  fetchQuotes: fetchQuotes
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}; // Connect and render.


var AppContainer = connect(mapStateToProps, mapDispatchToProps)(RandomQuotes);
ReactDOM.render(React.createElement(Provider, {
  store: store
}, React.createElement(AppContainer, null)), document.getElementById('root'));
//# sourceMappingURL=rr_rqm.js.map