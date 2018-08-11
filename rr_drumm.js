const React = React
const ReactDOM = ReactDOM
const PropTypes = PropTypes
const {
  createStore,
  applyMiddleware,
  bindActionCreators,
  combineReducers,
  compose,
} = Redux;
const { Provider, connect } = ReactRedux;
const ReduxThunk = ReduxThunk.default;

const LMMS_URL = 'https://raw.githubusercontent.com/LMMS/assets/master/Samples/Sample%20library/Drums/'
const triggerKeys = ['Q', 'W', 'E', 'A', 'S', 'D', 'Z', 'X', 'C']

// Main Connected Container renders Drum Machine according to state update.
class DrumMachine extends React.PureComponent {
  constructor(props) {
    super(props)
    this.drumPads = []
  }
  componentDidMount = () => {
    console.log('didMount:', this)
    document.addEventListener('keydown', this.handleKeyPress);
    this.props.fetchSamples();
  }
  componentWillUnmount = () => {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  // Handlers.
  playSampleClick = (event) => {
    const id = event.target.firstElementChild.id
    this.playDrumPad(id)
  }
  handleKeyPress = (event) => {
    const id = String.fromCharCode(event.keyCode)
    this.playDrumPad(id)
  }

  // Plays Sound from given DrumPad with id if exists.
  playDrumPad = (id) => {
    if (this.drumPads[id]) {
      console.log('play', this.drumPads[id])
      this.props.updateDisplay(this.drumPads[id].getAttribute('name'))
      this.drumPads[id].currentTime = 0
      this.drumPads[id].play();
    }
  }

  render() {
    const { sampleList, isFetching, lastUpdated, currentDisplay } = this.props
    if (isFetching === true) {
      console.log('DrumMachineFetching:', this.props)
      return (
          <div className="wrapper">
            Loading...
          </div>
      )
    }
    else {
      const DrumPads = Object.keys(sampleList).map((key, index) => {
        if (index < 9) {
          return (
              <DrumPad ref={el => (this.drumPads[triggerKeys[index]] = el)}
                       key={index}
                       playSampleClick={this.playSampleClick}
                       sampleName={sampleList[key][1].sampleName}
                       triggerKey={triggerKeys[index]}
                       sample={sampleList[key][1].sample}/>
          )
        }
      })
      console.log('DrumMachineChange:', this.props, this.state)
      return (
          <div id="wrapper">
            <div className="drum-box" id="drum-machine">
              <div className="drum-box" id="display">
                {currentDisplay || 'DRUM ON!'}
              </div>
              {DrumPads}
            </div>
          </div>
      )
    }
  }
}
// PropTypes for RandomQuotes.
DrumMachine.propTypes = {
  sampleList: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number.isRequired,
  currentDisplay: PropTypes.string,
};

// Builds and returns a single drum pad.
const DrumPad = React.forwardRef(({sampleName, triggerKey, sample, playSampleClick, padStyle}, ref) => {
  return (
      <button id={sampleName}
              onClick={playSampleClick}
              className="calc-button"
              style={padStyle}>
        <audio ref={ref}
               className='clip'
               id={triggerKey}
               src={sample}
               name={sampleName}
               preload="auto"></audio>
        {triggerKey}
      </button>
  )
});
// PropTypes for DrumPad.
DrumPad.propTypes = {
  sampleName: PropTypes.string.isRequired,
  triggerKey: PropTypes.string.isRequired,
  sample: PropTypes.string.isRequired,
  playSampleClick: PropTypes.func.isRequired,
  padStyle: PropTypes.string,
};

// Actions.
const REQUEST_SAMPLES = 'REQUEST_SAMPLES'
const ERROR_SAMPLES = 'ERROR_SAMPLES'
const RECEIVE_SAMPLES = 'RECEIVE_SAMPLES'
const UPDATE_DISPLAY = 'UPDATE_DISPLAY'
// Action Providers.
const requestSamples = () => { return { type: REQUEST_SAMPLES } }
const errorSamples = () => { return { type: ERROR_SAMPLES } }
const receiveSamples = (json) => {
  console.log(json)
  let sampleList = {},
      lastInstrument = ''
  json.tree.map((item) => {
    if (item.type === 'tree') {
      lastInstrument = item.path
      sampleList[item.path] = []
    }
    else {
      sampleList[lastInstrument].push({
        sample: LMMS_URL + item.path,
        sampleName: item.path.replace(lastInstrument + '/', '').replace('.flac', '')
      })
    }
  })
  console.log(sampleList)
  return {
    type: RECEIVE_SAMPLES,
    sampleList: sampleList,
    receivedAt: Date.now()
  }
};
const fetchSamples = () => {
  return (dispatch) => {
    dispatch(requestSamples());
    // Fetch the Sample list from LMMS assets (CC0).
    // (https://github.com/LMMS/assets/tree/master/Samples/Sample%20library/Drums)
    const samplesRequest = new Request('https://api.github.com/repos/LMMS/assets/git/trees/fef895eb405c2a7aad48679dd5b43fed3c1dd3bc?recursive=true');
    console.log(samplesRequest)
    return fetch(samplesRequest)
        .then(
            response => response.json(),
            error => console.log('An error occurred.', error)
        )
        .then(json => json ? dispatch(receiveSamples(json))
            : dispatch(errorSamples(json))
        )
  }
};
const updateDisplay = (text) => {
  return { type: UPDATE_DISPLAY, text: text}
}

// Set up defaultState.
const defaultState = {
  isFetching: false,
  sampleList: {},
  lastUpdated: 0,
  currentDisplay: '',
};
// Reducer - Fetches and returns quotes.
const samplesReducer = (state = defaultState, action) => {
  console.log('samplesReducer:', state, action.type)
  switch (action.type) {
    case REQUEST_SAMPLES:
      console.log('requested')
      return {...state,
        isFetching: true,
      }
    case RECEIVE_SAMPLES:
      console.log('received')
      return {...state,
        isFetching: false,
        sampleList: action.sampleList,
        lastUpdated: action.receivedAt
      }
    case UPDATE_DISPLAY:
      console.log('display:', action)
      return {...state,
        currentDisplay: action.text
      }
    case ERROR_SAMPLES:
    default:
      return state
  }
};
// Combine for easier access.
const reducer = combineReducers({
  samples: samplesReducer,
});
// Add Redux Dev-Tools if available.
const composeEnhancers = typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    || compose;
// Create Store and set "preloadedState".
const store = createStore(
    reducer,
    {samples: {...defaultState}},
    composeEnhancers(
        applyMiddleware(ReduxThunk)
    )
);

// Extract quotes and map to props.
const mapStateToProps = (state, props) => {
  return ({ ...state.samples })
}

// "Map" action Creator(s).
const actionCreators = {
  fetchSamples,
  updateDisplay,
}
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

// Connect and render.
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(DrumMachine)

ReactDOM.render(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
    document.getElementById('root')
);
