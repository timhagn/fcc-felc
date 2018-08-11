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

let timer = null;

// Main Connected Container renders Pomodoro Clock according to state updates.
class Pomodoro extends React.PureComponent {
  constructor(props) {
    super(props);
    this.beep = undefined;
  }

  // Button Handlers.
  buttonClick = (event) => {
    const id = event.target.id || event.target.parentElement.id;
    console.log(id);
    if (ACTION_MAPPING[id]) {
      this.props.mappedClick(id)
    }
  }

  startStopClick = () => {
    console.log(this.props.timerRunning)
    if (!this.props.timerRunning) {
      this.props.startTimer();
    } else {
      this.props.stopTimer();
    }
  }

  resetClick = (event) => {
    this.beep.pause();
    this.beep.currentTime = 0;
    this.props.stopTimer();
    this.buttonClick(event)
  }

  // Play Sound on expiration.
  handleExpired = () => {
    this.beep.currentTime = 0
    this.beep.play();
  }

  render() {
    const { timeLeft, breakLength, sessionLength, breakTimer } = this.props
    console.log('PomodoroChange:', this.props, this.state)
    return (
        <div id="wrapper">
          <div id="pomodoro">
            <div className="main-title">Pomodoro Clock</div>
            <TimerDisplay timeLeft={timeLeft}
                          breakTimer={breakTimer}
                          handleExpired={this.handleExpired}/>
            <BreakLengthControl buttonClick={this.buttonClick}
                                breakLength={breakLength}/>
            <SessionLengthControl buttonClick={this.buttonClick}
                                  sessionLength={sessionLength}/>
            <TimerControl startStopClick={this.startStopClick}
                          resetClick={this.resetClick} />
            <div className="developer">
              Developed (and "styled" % ) by Tim Hagn.
            </div>
            <AudioBeep ref={el => (this.beep = el)}
                       id="beep"
                       sample="https://soundbible.com/mp3/Music_Box-Big_Daddy-1389738694.mp3" />
          </div>
        </div>
    )
  }
}
// PropTypes for Pomodoro.
Pomodoro.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  timerRunning: PropTypes.bool.isRequired,
  breakLength: PropTypes.number.isRequired,
  sessionLength: PropTypes.number.isRequired,
  breakTimer: PropTypes.bool.isRequired,
};

// Builds and returns the Timer Display.
const TimerDisplay = ({ timeLeft, handleExpired, breakTimer }) => {
  let minutes = parseInt(timeLeft / 60, 10)
  let seconds = parseInt(timeLeft - minutes * 60, 10);

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  const timerDisplay = minutes + ":" + seconds;
  const timerLabel = breakTimer ? 'Break' : 'Session';
  const backgroundClass = breakTimer ? 'timer-wrapper timer-break' : 'timer-wrapper';

  if (timeLeft === 0) {
    handleExpired();
  }
  return (
      <div className="timer">
        <div className={backgroundClass}>
          <div id="timer-label">{timerLabel}</div>
          <div id="time-left">{timerDisplay}</div>
        </div>
      </div>
  )
};
// PropTypes for TimerDisplay.
TimerDisplay.propTypes = {
  timeLeft: PropTypes.number.isRequired,
  breakTimer: PropTypes.bool.isRequired,
  handleExpired: PropTypes.func.isRequired,
};

// Builds and returns the Audio Element.
const AudioBeep = React.forwardRef(({id, sample}, ref) => {
  return (
      <React.Fragment>
        <audio ref={ref}
               id={id}
               src={sample}
               preload="auto"></audio>
      </React.Fragment>
  )
});
// PropTypes for DrumPad.
AudioBeep.propTypes = {
  id: PropTypes.string.isRequired,
  sample: PropTypes.string.isRequired,
};

// Builds and returns the Break Length Control.
const BreakLengthControl = ({buttonClick, breakLength}) => {
  return (
      <div className="length-control">
        <div id="break-label">Break Length</div>
        <TimerButton id="break-decrement"
                     className="btn-level"
                     value="-"
                     buttonClick={buttonClick}>
          <i className="far fa-minus-square"></i>
        </TimerButton>
        <div id="break-length">
          {breakLength}
        </div>
        <TimerButton id="break-increment"
                     className="btn-level"
                     value="+"
                     buttonClick={buttonClick}>
          <i className="far fa-plus-square"></i>
        </TimerButton>
      </div>
  )
};
// PropTypes for BreakLengthControl.
BreakLengthControl.propTypes = {
  buttonClick: PropTypes.func.isRequired,
  breakLength: PropTypes.number.isRequired,
};

// Builds and returns the Session Length Control.
const SessionLengthControl = ({buttonClick, sessionLength}) => {
    return (
        <div className="length-control">
          <div id="session-label">Session Length</div>
          <TimerButton id="session-decrement"
                       className="btn-level"
                       value="-"
                       buttonClick={buttonClick}>
            <i className="far fa-minus-square"></i>
          </TimerButton>
          <div id="session-length">
            {sessionLength}
          </div>
          <TimerButton id="session-increment"
                       className="btn-level"
                       value="+"
                       buttonClick={buttonClick}>
            <i className="far fa-plus-square"></i>
          </TimerButton>
        </div>
    )
};
// PropTypes for SessionLengthControl.
SessionLengthControl.propTypes = {
  buttonClick: PropTypes.func.isRequired,
  sessionLength: PropTypes.number.isRequired,
};

// Builds and returns the Timer Main Control.
const TimerControl = ({startStopClick, resetClick}) => {
  return (
      <div className="timer-control">
        <TimerButton id="start_stop"
                     className="btn-level"
                     buttonClick={startStopClick}>
          <i className="fas fa-stopwatch"></i>
        </TimerButton>
        <TimerButton id="reset"
                     className="btn-level"
                     buttonClick={resetClick}>
          <i className="fas fa-history"></i>
        </TimerButton>
      </div>
  )
};
// PropTypes for ActionPad.
TimerControl.propTypes = {
  startStopClick: PropTypes.func.isRequired,
  resetClick: PropTypes.func.isRequired,
};

// Builds and returns a single Timer button.
const TimerButton =({id, className, value, buttonClick, children}) => {
  return (
      <button id={id}
              onClick={buttonClick}
              className={className}
              value={value}>
        {children}
      </button>
  )
};
// PropTypes for TimerButton.
TimerButton.propTypes = {
  id: PropTypes.string.isRequired,
  buttonClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  value: PropTypes.string,
};


// Actions.
const BREAK_DECREMENT = 'BREAK_DECREMENT'
const BREAK_INCREMENT = 'BREAK_INCREMENT'
const SESSION_DECREMENT = 'SESSION_DECREMENT'
const SESSION_INCREMENT = 'SESSION_INCREMENT'
const START_STOP = 'START_STOP'
const RESET = 'RESET'
const TIMER_TICK = 'TIMER_TICK'
const TIMER_START = 'TIMER_START'
const TIMER_STOP = 'TIMER_STOP'
const START_BREAK = 'START_BREAK'
const STOP_BREAK = 'STOP_BREAK'

const ACTION_MAPPING = {
  'break-decrement': BREAK_DECREMENT,
  'break-increment': BREAK_INCREMENT,
  'session-decrement': SESSION_DECREMENT,
  'session-increment': SESSION_INCREMENT,
  'start_stop': START_STOP,
  'reset': RESET,
};

// Action creators.
const mappedClick = (id) => {
  console.log(id);
  return { type: ACTION_MAPPING[id] }
}

const startTimer = () => (dispatch, getState) => {
  clearInterval(timer);
  timer = setInterval(() => {
    const state = getState()
    if (state.pomodoro.timeLeft === 0) {
      if (state.pomodoro.breakTimer) {
        dispatch(stopBreak())
      } else {
        dispatch(startBreak())
      }
    }
    dispatch(tick())
  }, 1000);
  dispatch({ type: TIMER_START });
}

const tick = () => { return{ type: TIMER_TICK } }

const stopTimer = () => {
  clearInterval(timer);
  return { type: TIMER_STOP };
}

const startBreak = () => { return { type: START_BREAK } }

const stopBreak = () => { return { type: STOP_BREAK } }

// Set up defaultState.
const defaultState = {
  breakLength: 5,
  sessionLength: 25,
  timeLeft: 60 * 25,
  timerRunning: false,
  breakTimer: false,
};
// Reducer - Updates Display.
const pomodoroReducer = (state = defaultState, action) => {
  console.log('pomodoroReducer:', state, action.type)
  switch (action.type) {
    case BREAK_DECREMENT:
      console.log('BREAK_DECREMENT:', action)
      const decrementedBreakLength = state.breakLength - 1 < 1 ?
          state.breakLength : state.breakLength - 1;
      return {...state,
        breakLength: decrementedBreakLength,
      }
    case BREAK_INCREMENT:
      const incrementedBreakLength = state.breakLength + 1 > 60 ?
          state.breakLength : state.breakLength + 1;
      console.log('BREAK_INCREMENT:', action)
      return {...state,
        breakLength: incrementedBreakLength,
      }
    case SESSION_DECREMENT:
      console.log('SESSION_DECREMENT:', action)
      const decrementedSessionLength = state.sessionLength - 1 < 1 ?
          state.sessionLength : state.sessionLength - 1;
      const decrementedTime = state.timeLeft - 60 < 60 ?
          state.timeLeft : state.timeLeft - 60;
      return {...state,
        sessionLength: decrementedSessionLength,
        timeLeft: decrementedTime,
      }
    case SESSION_INCREMENT:
      console.log('SESSION_INCREMENT:', action)
      const incrementedSessionLength = state.sessionLength + 1 > 60 ?
          state.sessionLength : state.sessionLength + 1;
      const incrementedTime = state.timeLeft + 60 > 60 * 60 ?
          state.timeLeft : state.timeLeft + 60;
      return {...state,
        sessionLength: incrementedSessionLength,
        timeLeft: incrementedTime,
      }
    case TIMER_START:
      console.log('TIMER_START:', action)
      return {...state,
        timerRunning: true,
      }
    case TIMER_STOP:
      console.log('TIMER_STOP:', action)
      return {...state,
        timerRunning: false,
      }
    case TIMER_TICK:
      console.log('TIMER_TICK:', action)
      const timeLeft = state.timeLeft - 1 < 0 ?
          state.timeLeft : state.timeLeft - 1;
      return {...state,
        timeLeft: timeLeft,
      }
    case START_BREAK:
      // Plus 1 to counter the next TIMER_TICK - only to get the _exact_ result
      // wanted in the tests -.-
      return {...state,
        timeLeft: state.breakLength * 60 + 1,
        breakTimer: true,
      }
    case STOP_BREAK:
      // Plus 1 to counter the next TIMER_TICK - only to get the _exact_ result
      // wanted in the tests -.-
      return {...state,
        timeLeft: state.sessionLength * 60 + 1,
        breakTimer: false,
      }
    case RESET:
      console.log('RESET:', action)
      return {...state,
        ...defaultState,
      }
    default:
      return state
  }
};
// Combine for easier access.
const reducer = combineReducers({
  pomodoro: pomodoroReducer,
});
// Add Redux Dev-Tools if available.
const composeEnhancers = typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    || compose;
// Create Store and set "preloadedState".
const store = createStore(
    reducer,
    {pomodoro: {...defaultState}},
    composeEnhancers(
        applyMiddleware(ReduxThunk)
    )
);

// Extract state and map to props.
const mapStateToProps = (state, props) => {
  return ({ ...state.pomodoro })
}

// "Map" action Creator(s).
const actionCreators = {
  mappedClick,
  startTimer,
  stopTimer,
}
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

// Connect and render.
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(Pomodoro)

ReactDOM.render(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
    document.getElementById('root')
);
