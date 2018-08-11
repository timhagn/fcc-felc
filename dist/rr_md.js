"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

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
var markedjs = marked; // Return links with target="_blank".

var renderer = new marked.Renderer();

renderer.link = function (href, title, text) {
  return "<a target=\"_blank\" href=\"".concat(href, "\">").concat(text) + '</a>';
}; // Allow line-breaks on carriage-return and set renderer.


markedjs.setOptions({
  renderer: renderer,
  breaks: true
}); // Main Connected Container renders both Editor and Preview.

var MarkdownPreview =
/*#__PURE__*/
function (_React$PureComponent) {
  _inherits(MarkdownPreview, _React$PureComponent);

  function MarkdownPreview() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, MarkdownPreview);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(MarkdownPreview)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidMount", function () {
      var markdown = _this.props.markdown;

      _this.props.changeMarkdown(markdown);
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (event) {
      //event.preventDefault()
      _this.props.changeMarkdown(event.target.value);
    });

    return _this;
  }

  _createClass(MarkdownPreview, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          markdown = _this$props.markdown,
          html = _this$props.html;
      return React.createElement("div", {
        id: "wrapper"
      }, React.createElement(MarkdownEditor, {
        className: "Home-intro",
        handleChange: this.handleChange,
        rows: 25,
        cols: 80,
        value: markdown
      }), React.createElement(MarkdownEditPreview, {
        className: "Home-intro",
        html: html
      }));
    }
  }]);

  return MarkdownPreview;
}(React.PureComponent); // PropTypes for MarkdownPreview.


MarkdownPreview.propTypes = {
  markdown: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired
}; // Builds and returns the MarkdownEditor Textarea.

var MarkdownEditor = function MarkdownEditor(_ref) {
  var handleChange = _ref.handleChange,
      rows = _ref.rows,
      cols = _ref.cols,
      value = _ref.value;
  return React.createElement("div", {
    className: "text-box"
  }, React.createElement("div", {
    className: "quote-text"
  }, React.createElement("textarea", {
    id: "editor",
    rows: rows,
    cols: cols,
    onChange: handleChange,
    value: value
  })));
}; // PropTypes for MarkdownEditor.


MarkdownEditor.MarkdownEditor = {
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired
}; // Builds and returns the MarkdownEditPreview Area.

var MarkdownEditPreview = function MarkdownEditPreview(_ref2) {
  var html = _ref2.html;
  var props = {
    dangerouslySetInnerHTML: {
      __html: html
    }
  };
  return React.createElement("div", {
    className: "text-box"
  }, React.createElement("div", _extends({
    id: "preview"
  }, props)));
}; // PropTypes for MarkdownEditPreview.


MarkdownEditPreview.propTypes = {
  html: PropTypes.string.isRequired
}; // Action(s).

var MARKDOWN_CHANGE = 'MARKDOWN_CHANGE'; // Action Provider(s).

var changeMarkdown = function changeMarkdown(value) {
  var html = markedjs(value.replace("\r", '<br/>'));
  return {
    type: MARKDOWN_CHANGE,
    markdown: value,
    html: html
  };
};

var placeholder = "# Angues sanguine et hanc\n\n## Est omnia catulus succrescere fecit petentem fatis\n\nLorem markdownum harenosi; non Iris si, *sed* et praeterque lavere cingo\nAchilles dolisque ad Hodites educere alta spissisque? \nPorrigit est, me deae, litora pervia tecta auro saepe nefas, haec temptavit neu \nfacinus Atreus pedum, dant. \nLeones coniurataeque quae Munychiosque illum, defensamus levitate eo aequore est\ntot contigit ad aurea gentis unda silices, ad. Recursus peremptis scilicet\npulsis: aliquem tempestate nunc arceor; quae venas, ad illa, et facies! Reservet\ncommunem fessa, laudis et marmore, flamma et ait texique [feras inferni\nordine](https://www.freecodecamp.com/).\n```\n    if (cMultitasking <= sound_nosql_parity) {\n        server(59);\n        digitalSyntax.flaming(yottabyteBotnet(2), threadWarmPixel);\n    }\n    outbox_nat = unc_spam;\n    var rss_active_broadband = cron + malwareMouse + hexadecimalWiredSession;\n```\nSuperorum utque magnaque videntem altissima ab inque ruitis, an minimum ripam.\nMissis vultu precanda obsistere victoremque cupido [nata\nattulerat](https://codepen.io/timhagn/pen/eKoOyx) omnia, grandior. Sanguis falsi, \nquoque rastrorumque in varias, _laevum lacrimas_ et **tibi**! \n`<fragment></fragment>` ; ).\nQuies sus parabat tuos per ut **spicula** et **_aquarum_**, enim.\n\n> Tua per traiecit exitio novaeque odoratis convicia\n\nFulmine Aiacem terribili *est*. Quam nec spernit dominae .\n\nFulmine Header | Aiacem Header | Quam Header\n------------ | ------------- | ------------- \nterribili | est | nec\ncrevisse | vultu | dominae\n\nUnda versi [lenti](https://codepen.io/timhagn/pen/ERRjaR). \n* Unius laudisque quae vulnus pictis, dentes\n  * adflati alto misso imitantia. Umidus pictis pervidet onerosus\n    * vinclisque quaerit donec ponti lassavit pariterque: erat mea. \n1. Troianae pia gestu pallenti Scylla, fallacis conticuit ista; \n2. Argos unda nullamque abscidit quam regi, dant ossa\n3. Flectimur me **thalamos**, ubi auro fer Sinis\n4. iners Phlegon facibus obnoxius iuvenem perfida, vocem?\n\nProgenuit Mnemonidas munus, enim tulit, at etiam: taceam, creavit flammae\nostendit iustae omnes. Manus sacrilegos virtus et cuius palustri tecta spreta\ndigestum Aries; ille aderant frequens. Anxia femina, responderat **incerta\ncanori**. Et tutae si iamque, mori late vetito, ei agmine.\n\n![<th>](https://www.timhagn.com/images/th_logo.png)\n"; // Set up defaultState.

var defaultState = {
  markdown: placeholder,
  html: ''
}; // Reducer - Fetches and returns quotes.

var markdownReducer = function markdownReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : defaultState;
  var action = arguments.length > 1 ? arguments[1] : undefined;

  switch (action.type) {
    case MARKDOWN_CHANGE:
      return _objectSpread({}, state, {
        markdown: action.markdown,
        html: action.html
      });

    default:
      return state;
  }
}; // Combine for easier access.


var reducer = combineReducers({
  md: markdownReducer
}); // Add Redux Dev-Tools if available.

var composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // Create Store and set "preloadedState".

var store = createStore(reducer, {
  md: _objectSpread({}, defaultState)
}, composeEnhancers(applyMiddleware(ReduxThunk))); // Extract Markdown & HTMl and map to props.

var mapStateToProps = function mapStateToProps(state, props) {
  return _objectSpread({}, state.md);
}; // "Map" action Creator(s).


var actionCreators = {
  changeMarkdown: changeMarkdown
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}; // Connect and render.


var AppContainer = connect(mapStateToProps, mapDispatchToProps)(MarkdownPreview);
ReactDOM.render(React.createElement(Provider, {
  store: store
}, React.createElement(AppContainer, null)), document.getElementById('root'));
//# sourceMappingURL=rr_md.js.map