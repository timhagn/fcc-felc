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
const markedjs = marked;

// Return links with target="_blank".
const renderer = new marked.Renderer();
renderer.link = function (href, title, text) {
  return `<a target="_blank" href="${href}">${text}` + '</a>';
}

// Allow line-breaks on carriage-return and set renderer.
markedjs.setOptions({
  renderer: renderer,
  breaks: true,
});


// Main Connected Container renders both Editor and Preview.
class MarkdownPreview extends React.PureComponent {
  componentDidMount = () => {
    const { markdown } = this.props
    this.props.changeMarkdown(markdown)
  }

  handleChange = (event) => {
    //event.preventDefault()
    this.props.changeMarkdown(event.target.value)
  }

  render() {
    const { markdown, html } = this.props
    return (
        <div id="wrapper">
          <MarkdownEditor className="Home-intro"
                          handleChange={this.handleChange}
                          rows={25}
                          cols={80}
                          value={markdown}/>
          <MarkdownEditPreview className="Home-intro"
                               html={html}/>
        </div>
    )
  }
}
// PropTypes for MarkdownPreview.
MarkdownPreview.propTypes = {
  markdown: PropTypes.string.isRequired,
  html: PropTypes.string.isRequired,
};

// Builds and returns the MarkdownEditor Textarea.
const MarkdownEditor = ({handleChange, rows, cols, value}) => {
  return(
      <div className="text-box">
        <div className="quote-text">
          <textarea id="editor"
                    rows={rows}
                    cols={cols}
                    onChange={handleChange}
                    value={value} />
        </div>
      </div>
  )};
// PropTypes for MarkdownEditor.
MarkdownEditor.MarkdownEditor = {
  rows: PropTypes.number.isRequired,
  cols: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
};

// Builds and returns the MarkdownEditPreview Area.
const MarkdownEditPreview = ({html}) => {
  const props = {
    dangerouslySetInnerHTML: { __html: html },
  };
  return(
      <div className="text-box">
        <div id="preview" {...props} />
      </div>
  )};
// PropTypes for MarkdownEditPreview.
MarkdownEditPreview.propTypes = {
  html: PropTypes.string.isRequired,
};

// Action(s).
const MARKDOWN_CHANGE = 'MARKDOWN_CHANGE'

// Action Provider(s).
const changeMarkdown = (value) => {
  let html = markedjs(value.replace("\r", '<br/>'))
  return {
    type: MARKDOWN_CHANGE,
    markdown: value,
    html: html,
  }
};

const placeholder =
    `# Angues sanguine et hanc

## Est omnia catulus succrescere fecit petentem fatis

Lorem markdownum harenosi; non Iris si, *sed* et praeterque lavere cingo
Achilles dolisque ad Hodites educere alta spissisque? 
Porrigit est, me deae, litora pervia tecta auro saepe nefas, haec temptavit neu 
facinus Atreus pedum, dant. 
Leones coniurataeque quae Munychiosque illum, defensamus levitate eo aequore est
tot contigit ad aurea gentis unda silices, ad. Recursus peremptis scilicet
pulsis: aliquem tempestate nunc arceor; quae venas, ad illa, et facies! Reservet
communem fessa, laudis et marmore, flamma et ait texique [feras inferni
ordine](https://www.freecodecamp.com/).
\`\`\`
    if (cMultitasking <= sound_nosql_parity) {
        server(59);
        digitalSyntax.flaming(yottabyteBotnet(2), threadWarmPixel);
    }
    outbox_nat = unc_spam;
    var rss_active_broadband = cron + malwareMouse + hexadecimalWiredSession;
\`\`\`
Superorum utque magnaque videntem altissima ab inque ruitis, an minimum ripam.
Missis vultu precanda obsistere victoremque cupido [nata
attulerat](https://codepen.io/timhagn/pen/eKoOyx) omnia, grandior. Sanguis falsi, 
quoque rastrorumque in varias, _laevum lacrimas_ et **tibi**! 
\`<fragment></fragment>\` ; ).
Quies sus parabat tuos per ut **spicula** et **_aquarum_**, enim.

> Tua per traiecit exitio novaeque odoratis convicia

Fulmine Aiacem terribili *est*. Quam nec spernit dominae .

Fulmine Header | Aiacem Header | Quam Header
------------ | ------------- | ------------- 
terribili | est | nec
crevisse | vultu | dominae

Unda versi [lenti](https://codepen.io/timhagn/pen/ERRjaR). 
* Unius laudisque quae vulnus pictis, dentes
  * adflati alto misso imitantia. Umidus pictis pervidet onerosus
    * vinclisque quaerit donec ponti lassavit pariterque: erat mea. 
1. Troianae pia gestu pallenti Scylla, fallacis conticuit ista; 
2. Argos unda nullamque abscidit quam regi, dant ossa
3. Flectimur me **thalamos**, ubi auro fer Sinis
4. iners Phlegon facibus obnoxius iuvenem perfida, vocem?

Progenuit Mnemonidas munus, enim tulit, at etiam: taceam, creavit flammae
ostendit iustae omnes. Manus sacrilegos virtus et cuius palustri tecta spreta
digestum Aries; ille aderant frequens. Anxia femina, responderat **incerta
canori**. Et tutae si iamque, mori late vetito, ei agmine.

![<th>](https://www.timhagn.com/images/th_logo.png)
`

// Set up defaultState.
const defaultState = {
  markdown: placeholder,
  html: '',
};
// Reducer - Fetches and returns quotes.
const markdownReducer = (state = defaultState, action) => {
  switch (action.type) {
    case MARKDOWN_CHANGE:
      return {...state,
        markdown: action.markdown,
        html: action.html,
      }
    default:
      return state
  }
};
// Combine for easier access.
const reducer = combineReducers({
  md: markdownReducer,
});
// Add Redux Dev-Tools if available.
const composeEnhancers = typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    || compose;
// Create Store and set "preloadedState".
const store = createStore(
    reducer,
    {md: {...defaultState}},
    composeEnhancers(
        applyMiddleware(ReduxThunk)
    )
);

// Extract Markdown & HTMl and map to props.
const mapStateToProps = (state, props) => ({ ...state.md })

// "Map" action Creator(s).
const actionCreators = {
  changeMarkdown,
}
const mapDispatchToProps = (dispatch) => bindActionCreators(actionCreators, dispatch)

// Connect and render.
const AppContainer = connect(mapStateToProps, mapDispatchToProps)(MarkdownPreview)

ReactDOM.render(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
    document.getElementById('root')
);
