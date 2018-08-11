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

// Helper function to strip all html to text.
const strip = (html) => (new DOMParser()).parseFromString(html, 'text/html')
    .body.textContent.replace(/(<([^>]+)>)/ig, '').trim()

// Main Connected Container renders QuoteBox according to state update.
class RandomQuotes extends React.PureComponent {
  componentDidMount = () => {
    console.log('didMount:', this)
    this.props.fetchQuotes();
  }

  handleNewQuoteClick = (event) => {
    event.preventDefault()
    this.props.fetchQuotes()
  }

  render() {
    console.log('RandomQuotes:', this.props)
    const { quote, author, isFetching, lastUpdated } = this.props
    if (isFetching === true) {
      console.log('RandomQuotesFetching:', this.props)
      return (
          <div className="Home">
            <QuoteBox className="Home-intro"
                      newQuoteClick={this.handleNewQuoteClick}
                      author={'Last updated: ' + new Date(lastUpdated).toString()}
                      quote={'Loading...'}/>
          </div>
      )
    }
    else {
      console.log('RandomQuotesChange:', this.props)
      return (
          <div className="Home">
            <QuoteBox className="Home-intro"
                      newQuoteClick={this.handleNewQuoteClick}
                      author={author}
                      quote={quote}/>
          </div>
      )
    }
  }
}
// PropTypes for RandomQuotes.
RandomQuotes.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number.isRequired,
};

// Builds and returns the QuoteBox button.
const QuoteBox = ({quote, author, newQuoteClick}) => {
  console.log('QuoteBox: ', quote, author)
  return(
      <div id="wrapper">
        <div id="quote-box">
          <div className="quote-text" id="text">
            <i className="fa fa-quote-left"> </i>
            {quote || 'Here should be a quote...'}
          </div>
          <div className="quote-author" id="author">{author || 'A-NONE-NYMOUS'}</div>
          <div className="buttons">
            <TweetIt quote={quote}
                     author={author}/>
            <button className="button"
                    id="new-quote"
                    onClick={newQuoteClick}>New quote</button>
          </div>
        </div>
      </div>
  )};
// PropTypes for QuoteBox.
QuoteBox.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  newQuoteClick: PropTypes.func.isRequired,
};

// Builds and returns Tweet button.
const TweetIt = ({quote, author}) => {
  const hashtags = '100DaysOfCode,freeCodeCamp,RandomQuotes',
      text = encodeURI(`${quote} - ${author}\n`),
      query = `text=${text}&url="${location.href}"&hashtags=${hashtags}`,
      href = `https://twitter.com/intent/tweet?${query}`;
  return (
      <a className="button"
         id="tweet-quote"
         title="Tweet this quote!"
         target="_blank"
         href={href}>
        <i className="fab fa-twitter-square" />
      </a>
  )
};
// PropTypes for TweetIt.
TweetIt.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

// Actions.
const REQUEST_QUOTES = 'REQUEST_QUOTES'
const ERROR_QUOTES = 'ERROR_QUOTES'
const RECEIVE_QUOTES = 'RECEIVE_QUOTES'
// Action Providers.
const requestQuotes = () => { return { type: REQUEST_QUOTES } }
const errorQuotes = () => { return { type: ERROR_QUOTES } }
const receiveQuotes = (json) => {
  console.log(json)
  let randNum = Math.floor(Math.random() * 10);
  let {content: quote, title: author} = json[randNum];
  console.log('receiveQuotes():', strip(quote), author)
  return {
    type: RECEIVE_QUOTES,
    quote: strip(quote),
    author,
    receivedAt: Date.now()
  }
};
const fetchQuotes = () => {
  return (dispatch) => {
    dispatch(requestQuotes());
    const quotesRequest = new Request("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10&callback=");
    console.log(quotesRequest)
    return fetch(quotesRequest)
        .then(
            response => response.json(),
            error => console.log('An error occurred.', error)
        )
        .then(json => json ? dispatch(receiveQuotes(json))
                           : dispatch(errorQuotes(json))
        )
  }
};


// Set up defaultState.
const defaultState = {
  isFetching: false,
  author: '',
  quote: '',
  lastUpdated: 0,
};
// Reducer - Fetches and returns quotes.
const quotesReducer = (state = defaultState, action) => {
  console.log('quotesReducer:', state, action.type)
  switch (action.type) {
    case REQUEST_QUOTES:
      console.log('requested')
      return {...state,
        isFetching: true,
      }
    case RECEIVE_QUOTES:
      console.log('received')
      return {...state,
        isFetching: false,
        quote: action.quote,
        author: action.author,
        lastUpdated: action.receivedAt
      }
    case ERROR_QUOTES:
    default:
      return state
  }
};
// Combine for easier access.
const reducer = combineReducers({
  quotes: quotesReducer,
});
// Add Redux Dev-Tools if available.
const composeEnhancers = typeof window !== 'undefined' && 
                         window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
                         || compose;
// Create Store and set "preloadedState".
const store = createStore(
    reducer,
    {quotes: {...defaultState}},
    composeEnhancers(
      applyMiddleware(ReduxThunk)
    )
);

// Extract quotes and map to props.
const mapStateToProps = (state, props) => ({ ...state.quotes })

// "Map" action Creator(s).
const actionCreators = {
  fetchQuotes,
}
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

// Connect and render.
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(RandomQuotes)

ReactDOM.render(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
    document.getElementById('root')
);
