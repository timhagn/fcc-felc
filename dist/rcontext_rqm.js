"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

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
var PropTypes = PropTypes; // Helper function to strip all html to text.

var strip = function strip(html) {
  return new DOMParser().parseFromString(html, 'text/html').body.textContent.replace(/(<([^>]+)>)/ig, '').trim();
}; // Main "App" renders the Quote Box.


var RandomQuotes = function RandomQuotes(_ref) {
  var quote = _ref.quote,
      author = _ref.author,
      handleNewQuoteClick = _ref.handleNewQuoteClick;
  console.log('QuoteBox: ', quote, author, handleNewQuoteClick);
  return React.createElement("div", {
    id: "wrapper"
  }, React.createElement("div", {
    id: "quote-box"
  }, React.createElement("div", {
    className: "quote-text",
    id: "text"
  }, React.createElement("i", {
    className: "fa fa-quote-left"
  }, " "), quote || 'Here will be a quote...'), React.createElement("div", {
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
    onClick: handleNewQuoteClick
  }, "New quote"))));
}; // PropTypes for QuoteBox.


RandomQuotes.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  handleNewQuoteClick: PropTypes.func.isRequired
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
}; // PropTypes for QuoteBox.


TweetIt.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired
}; // Create Provider & Consumer with Context API.

var DEFAULT_STATE = {
  quote: '',
  author: ''
};

var _React$createContext = React.createContext(DEFAULT_STATE),
    Provider = _React$createContext.Provider,
    Consumer = _React$createContext.Consumer;

var QuoteProvider =
/*#__PURE__*/
function (_React$Component) {
  _inherits(QuoteProvider, _React$Component);

  function QuoteProvider() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, QuoteProvider);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(QuoteProvider)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "state", DEFAULT_STATE);

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentWillMount", function () {
      _this.fetchQuotes();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleNewQuoteClick", function (event) {
      event.preventDefault();

      _this.fetchQuotes();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "fetchQuotes", function () {
      var quotesRequest = new Request("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10&callback=");
      console.log('fetchQuotes: ', quotesRequest);
      return fetch(quotesRequest).then(function (response) {
        return response.json();
      }, function (error) {
        return console.log('An error occurred.', error);
      }).then(function (json) {
        return json ? _this.receiveQuotes(json) : function (error) {
          return console.log('An error occurred.', error);
        };
      });
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "receiveQuotes", function (json) {
      console.log('receiveQuotes: ', json);
      var randNum = Math.floor(Math.random() * 10);
      var _json$randNum = json[randNum],
          quote = _json$randNum.content,
          author = _json$randNum.title;
      console.log('receiveQuotes', strip(quote), author);

      _this.setState({
        quote: strip(quote),
        author: author
      });
    });

    return _this;
  }

  _createClass(QuoteProvider, [{
    key: "render",
    value: function render() {
      console.log('Provider: ', this.props);
      return React.createElement(Provider, {
        value: _objectSpread({}, this.state, {
          handleNewQuoteClick: this.handleNewQuoteClick
        })
      }, this.props.children);
    }
  }]);

  return QuoteProvider;
}(React.Component);

var QuoteConsumer = function QuoteConsumer(props) {
  console.log('DataConsumer:', props);
  return React.createElement(Consumer, null, function (_ref3) {
    var quote = _ref3.quote,
        author = _ref3.author,
        handleNewQuoteClick = _ref3.handleNewQuoteClick;
    return React.createElement("div", {
      className: "Home"
    }, React.createElement(RandomQuotes, {
      className: "Home-intro",
      handleNewQuoteClick: handleNewQuoteClick,
      quote: quote,
      author: author
    }));
  });
};

ReactDOM.render(React.createElement(QuoteProvider, null, React.createElement(QuoteConsumer, null)), document.getElementById('root'));