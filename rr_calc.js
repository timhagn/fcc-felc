const React = React;
const ReactDOM = ReactDOM;
const PropTypes = PropTypes;
const {
  createStore,
  applyMiddleware,
  bindActionCreators,
  combineReducers,
  compose,
} = Redux;
const { Provider, connect } = ReactRedux;
const ReduxThunk = ReduxThunk.default;

const NUM_PAD_MAPPING = {
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
  'nine': '9',
};

const MATH_PAD_MAPPING = {
  'add': '+',
  'subtract': '-',
  'multiply': '*',
  'divide': '/',
};

const ACTION_MAPPING = {
  'equals': '=',
  'clear': 'clr',
};

const AVAILABLE_OPERATIONS = [
  MATH_PAD_MAPPING['add'],
  MATH_PAD_MAPPING['subtract'],
  MATH_PAD_MAPPING['multiply'],
  MATH_PAD_MAPPING['divide'],
];


// Finds a Object Key by Value.
const getObjectKeyByValue = (object, value) => Object.keys(object).find(key => object[key] === value);

const isNumeric = (value) => !isNaN(value - parseFloat(value));

// Returns "Id" (Symbol) from KeyCode.
const getIdFromKeyCode = (key) => {
  switch (key) {
    case 107:
    case 187:
      return('+');
    case 109:
    case 189:
      return('-');
    case 106:
    case 88:
      return('*');
    case 111:
      return('/');
    case 44:
    case 46:
      return('.');
    case 127:
      return('clr');
    case 13:
      return('=');
    default:
      return(String.fromCharCode(event.keyCode));
  }
};

// Returns the "calculated" result.
const calculateResult = (display) => {
  try {
    return String(eval(display))
  } catch(error) {
    return 'ERR'
  }
};

const DECIMAL_REGEX = /(\d+\.\d*)$/;
const SYMBOL_REGEX = /([+\-\*\/])$/;

// Prevents certain changes (double-zeros or -decimals) and adds the operator
// only once before returning the new Display string.
const checkDisplayOperation = (oldDisplay, operator) => {
  // Prevent multiple decimal points.
  if (operator === NUM_PAD_MAPPING["decimal"] &&
      !DECIMAL_REGEX.test(oldDisplay) &&
      !SYMBOL_REGEX.test(oldDisplay) &&
      !oldDisplay.endsWith(NUM_PAD_MAPPING["decimal"])) {
    return oldDisplay + operator;
  }
  if (getObjectKeyByValue(MATH_PAD_MAPPING, operator)) {
    // Replace last operand if exists.
    const lastOperand = oldDisplay.slice(-1);
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
};

// Main Connected Container renders Calculator according to state update.
class Calculator extends React.PureComponent {
  componentDidMount = () => {
    console.log('didMount:', this)
    document.addEventListener('keypress', this.handleKeyPress);
  }
  componentWillUnmount = () => {
    document.removeEventListener('keypress', this.handleKeyPress);
  }

  // Handlers.
  buttonClick = (event) => {
    const id = event.target.id;
    console.log(id);
    if (ACTION_MAPPING[id] === '=') {
      this.props.calcDisplay(this.display);
    }
    if (ACTION_MAPPING[id] === 'clr') {
      this.props.clearDisplay();
    } else {
      this.addInput(id)
    }
  }
  handleKeyPress = (event) => {
    const key = event.keyCode;
    console.log('key:', key);
    const id = getIdFromKeyCode(key);
    console.log('id:', id)
    if (id === '=') {
      this.props.calcDisplay(this.display);
    }
    if (id === 'clr') {
      this.props.clearDisplay();
    } else {
      this.addInput(id)
    }
  }

  // Adds the Pressed Button to Display if available.
  addInput = (id) => {
    const numMatch = NUM_PAD_MAPPING[id] ? id : getObjectKeyByValue(NUM_PAD_MAPPING, id);
    if (numMatch) {
      console.log('numPad', NUM_PAD_MAPPING[numMatch])
      this.props.updateDisplay(NUM_PAD_MAPPING[numMatch])
    }
    const mathMatch = MATH_PAD_MAPPING[id] ? id : getObjectKeyByValue(MATH_PAD_MAPPING, id);
    if (mathMatch) {
      console.log('mathPad', MATH_PAD_MAPPING[mathMatch])
      this.props.updateDisplay(MATH_PAD_MAPPING[mathMatch])
    }
  }

  render() {
    const { currentDisplay } = this.props
      /**
       *  [    id="display"     ]
       *  -----------------------
       *  [ numPad ][[ mathPad ]
       *  [        ] [ actPad  ]]
       */
    console.log('CalculatorChange:', this.props, this.state)
    return (
        <div id="wrapper">
          <div id="calculator">
            <div id="display">
              {currentDisplay}
            </div>
            <div id="pads">
              <div className="num-pad">
                <NumPad buttonClick={this.buttonClick} />
              </div>
              <div>
                <div className="math-pad">
                  <MathPad buttonClick={this.buttonClick} />
                </div>
                <div className="act-pad">
                  <ActionPad buttonClick={this.buttonClick} />
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
}
// PropTypes for Calculator.
Calculator.propTypes = {
  currentDisplay: PropTypes.string,
};

// Builds and returns the Number Pad.
const NumPad = ({buttonClick}) => {
  return Object.keys(NUM_PAD_MAPPING).reverse().map((key, index) => {
    return (
        <CalcButton key={index}
                    buttonClick={buttonClick}
                    id={key}
                    triggerKey={NUM_PAD_MAPPING[key]}/>
    )
  })
};
// PropTypes for NumPad.
NumPad.propTypes = {
  buttonClick: PropTypes.func.isRequired,
};

// Builds and returns the Number Pad.
const MathPad = ({buttonClick}) => {
  return Object.keys(MATH_PAD_MAPPING).map((key, index) => {
    return (
        <CalcButton key={index}
                    buttonClick={buttonClick}
                    id={key}
                    triggerKey={MATH_PAD_MAPPING[key]}/>
    )
  })
};
// PropTypes for MathPad.
MathPad.propTypes = {
  buttonClick: PropTypes.func.isRequired,
};

// Builds and returns the Action Pad.
const ActionPad = ({buttonClick}) => {
  return (
      <React.Fragment>
        <CalcButton key={ACTION_MAPPING["equals"]}
                    buttonClick={buttonClick}
                    id="equals"
                    triggerKey={ACTION_MAPPING["equals"]}/>
        <CalcButton key={ACTION_MAPPING["clear"]}
                    buttonClick={buttonClick}
                    id="clear"
                    triggerKey={ACTION_MAPPING["clear"]}/>
      </React.Fragment>
  )
};
// PropTypes for ActionPad.
ActionPad.propTypes = {
  buttonClick: PropTypes.func.isRequired,
};

// Builds and returns a single calculator button.
const CalcButton =({id, triggerKey, buttonClick, buttonStyle}) => {
  return (
      <button id={id}
              onClick={buttonClick}
              className="calc-button"
              style={buttonStyle}>
        {triggerKey}
      </button>
  )
};
// PropTypes for CalcButton.
CalcButton.propTypes = {
  id: PropTypes.string.isRequired,
  triggerKey: PropTypes.string.isRequired,
  buttonClick: PropTypes.func.isRequired,
  buttonStyle: PropTypes.string,
};


// Actions.
const UPDATE_DISPLAY = 'UPDATE_DISPLAY'
const CLEAR_DISPLAY = 'CLEAR_DISPLAY'
const CALCULATE_DISPLAY = 'CALCULATE_DISPLAY'
// Action Creators.
const updateDisplay = (text) => {
  return { type: UPDATE_DISPLAY, text}
}
const clearDisplay = () => ({ type: CLEAR_DISPLAY })
const calcDisplay = () => ({ type: CALCULATE_DISPLAY })

// Set up defaultState.
const defaultState = {
  currentDisplay: '0',
};
// Reducer - Updates Display.
const calcReducer = (state = defaultState, action) => {
  console.log('calcReducer:', state, action.type)
  switch (action.type) {
    case UPDATE_DISPLAY:
      console.log('update:', action)
      return {...state,
        currentDisplay: checkDisplayOperation(state.currentDisplay, action.text),
      }
    case CLEAR_DISPLAY:
      console.log('clear:', action)
      return {...state,
        currentDisplay: '0',
      }
    case CALCULATE_DISPLAY:
      console.log('calc:', action)
      return {...state,
        currentDisplay: calculateResult(state.currentDisplay),
      }
    default:
      return state
  }
};
// Combine for easier access.
const reducer = combineReducers({
  calc: calcReducer,
});
// Add Redux Dev-Tools if available.
const composeEnhancers = typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    || compose;
// Create Store and set "preloadedState".
const store = createStore(
    reducer,
    {calc: {...defaultState}},
    composeEnhancers(
        applyMiddleware(ReduxThunk)
    )
);

// Extract state and map to props.
const mapStateToProps = (state, props) => {
  return ({ ...state.calc })
}

// "Map" action Creator(s).
const actionCreators = {
  updateDisplay,
  clearDisplay,
  calcDisplay,
}
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

// Connect and render.
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(Calculator)

ReactDOM.render(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
    document.getElementById('root')
);
