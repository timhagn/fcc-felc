const React = React;
const ReactDOM = ReactDOM;
const PropTypes = PropTypes;

// Helper function to strip all html to text.
const strip = (html) => (new DOMParser()).parseFromString(html, 'text/html')
    .body.textContent.replace(/(<([^>]+)>)/ig, '').trim();

// Main "App" renders the Quote Box.
const RandomQuotes = ({quote, author, handleNewQuoteClick}) => {
  console.log('QuoteBox: ', quote, author, handleNewQuoteClick)
  return(
      <div id="wrapper">
        <div id="quote-box">
          <div className="quote-text" id="text">
            <i className="fa fa-quote-left"> </i>
            {quote || 'Here will be a quote...'}
          </div>
          <div className="quote-author" id="author">{author || 'A-NONE-NYMOUS'}</div>
          <div className="buttons">
            <TweetIt quote={quote}
                     author={author}/>
            <button className="button"
                    id="new-quote"
                    onClick={handleNewQuoteClick}>New quote</button>
          </div>
        </div>
      </div>
  )};
// PropTypes for QuoteBox.
RandomQuotes.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  handleNewQuoteClick: PropTypes.func.isRequired,
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
// PropTypes for QuoteBox.
TweetIt.propTypes = {
  quote: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

// Create Provider & Consumer with Context API.
const DEFAULT_STATE = {
  quote: '',
  author: '',
};

const {Provider, Consumer} = React.createContext(DEFAULT_STATE);

class QuoteProvider extends React.Component {
  state = DEFAULT_STATE;

  componentWillMount = () => {
    this.fetchQuotes();
  }

  handleNewQuoteClick = (event) => {
    event.preventDefault();
    this.fetchQuotes();
  };

  fetchQuotes = () => {
    const quotesRequest = new Request("https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10&callback=");
    console.log('fetchQuotes: ', quotesRequest)
    return fetch(quotesRequest)
        .then(
            response => response.json(),
            error => console.log('An error occurred.', error)
        )
        .then(json => json ?
            this.receiveQuotes(json) :
            error => console.log('An error occurred.', error)
        )
  };

  receiveQuotes = (json) => {
    console.log('receiveQuotes: ', json)
    let randNum = Math.floor(Math.random() * 10);
    let {content: quote, title: author} = json[randNum];
    console.log('receiveQuotes', strip(quote), author)
    this.setState({
      quote: strip(quote),
      author,
    })
  };

  render() {
    console.log('Provider: ', this.props);
    return (
        <Provider
            value={{
              ...this.state,
              handleNewQuoteClick: this.handleNewQuoteClick,
            }}
        >
          {this.props.children}
        </Provider>
    );
  }
}

const QuoteConsumer = (props) => {
  console.log('DataConsumer:', props);
  return (
      <Consumer>
        {({quote, author, handleNewQuoteClick}) =>
            <div className="Home">
              <RandomQuotes className="Home-intro"
                            handleNewQuoteClick={handleNewQuoteClick}
                            quote={quote}
                            author={author}/>
            </div>
        }
      </Consumer>
  );
};

ReactDOM.render(
    <QuoteProvider>
      <QuoteConsumer />
    </QuoteProvider>,
    document.getElementById('root')
);