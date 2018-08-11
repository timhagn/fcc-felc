"use strict";

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

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

var _React = React,
    Component = _React.Component;
var _Redux = Redux,
    createStore = _Redux.createStore,
    applyMiddleware = _Redux.applyMiddleware,
    bindActionCreators = _Redux.bindActionCreators;
var _ReactRedux = ReactRedux,
    Provider = _ReactRedux.Provider,
    connect = _ReactRedux.connect;
var ReduxThunk = ReduxThunk.default;

var App =
/*#__PURE__*/
function (_Component) {
  _inherits(App, _Component);

  function App() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, App);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(App)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "componentDidMount", function () {
      _this.props.fetchUsers();
    });

    _defineProperty(_assertThisInitialized(_assertThisInitialized(_this)), "handleChange", function (event) {
      _this.props.selectUser(event.target.value);
    });

    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      var userList = this.props.userList;
      var currentUser = this.props.currentUser;

      if (this.props.loading) {
        return React.createElement("div", null, "Loading...");
      } else if (this.props.error) {
        return React.createElement("div", null, this.props.error.message);
      }

      return React.createElement("div", null, React.createElement(Select, {
        onChange: this.handleChange,
        userList: userList
      }), React.createElement(CurrentUser, {
        currentUser: currentUser
      }));
    }
  }]);

  return App;
}(Component);

var Select = function Select(props) {
  var renderOptions = props.userList.map(function (user) {
    return React.createElement("option", {
      value: user.id,
      key: "user-".concat(user.id)
    }, user.name);
  });
  return React.createElement("select", {
    onChange: props.onChange,
    defaultValue: ""
  }, React.createElement("option", {
    value: ""
  }, "Select an avatar"), _toConsumableArray(renderOptions));
};

var CurrentUser = function CurrentUser(props) {
  return React.createElement("div", null, React.createElement("p", null, props.currentUser && JSON.stringify(props.currentUser)));
};
/* --- REDUCERS --- */


function reducer(state, action) {
  switch (action.type) {
    case "REQUEST_USERS":
      return _objectSpread({}, state, {
        loading: action.loading,
        userList: []
      });

    case "REQUEST_USERS_SUCCESS":
      return _objectSpread({}, state, {
        loading: action.loading,
        userList: action.userList
      });

    case "REQUEST_USERS_ERROR":
      return _objectSpread({}, state, {
        loading: action.loading,
        error: action.error
      });

    case "SELECT_USER":
      return _objectSpread({}, state, {
        currentUser: state.userList.find(function (user) {
          return user.id == action.currentUser;
        })
      });

    default:
      return state;
  }
}

;
/* --- ACTION CREATORS --- */

var actionCreators = {
  requestUsers: function requestUsers() {
    return {
      type: "REQUEST_USERS",
      loading: true,
      error: null
    };
  },
  requestUsersSuccess: function requestUsersSuccess(userList) {
    return {
      type: "REQUEST_USERS_SUCCESS",
      userList: userList,
      loading: false,
      error: null
    };
  },
  requestUsersError: function requestUsersError(error) {
    return {
      type: "REQUEST_USERS_ERROR",
      loading: false,
      userList: [],
      error: error
    };
  },
  fetchUsers: function fetchUsers() {
    return function (dispatch) {
      dispatch(actionCreators.requestUsers());
      return fetch("http://jsonplaceholder.typicode.com/users").then(function (response) {
        if (response.ok) {
          return response.json();
        }

        throw new Error("404");
      }).then(function (json) {
        return dispatch(actionCreators.requestUsersSuccess(json));
      }).catch(function (error) {
        console.error(error);
        dispatch(actionCreators.requestUsersError(error));
      });
    };
  },
  selectUser: function selectUser(currentUser) {
    return {
      type: "SELECT_USER",
      currentUser: currentUser
    };
  }
};
/* --- STORE --- */

var preloadedState = {
  userList: [],
  currentUser: null
};
var store = createStore(reducer, preloadedState, applyMiddleware(ReduxThunk));
/* --- CONNECT --- */

var AppContainer = connect(function mapStateToProps(state, props) {
  return {
    userList: state.userList,
    currentUser: state.currentUser,
    loading: state.loading,
    error: state.error
  };
}, function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
})(App);
/* --- RENDER THE APP --- */

ReactDOM.render(React.createElement(Provider, {
  store: store
}, React.createElement(AppContainer, null)), document.getElementById("app"));
//# sourceMappingURL=rr_user.js.map