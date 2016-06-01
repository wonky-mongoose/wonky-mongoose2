class DeckView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentCard: ''
      currentDeck: []
    }
  }

  componentDidMount() {
    this.loadQuestionView();
  }

  switchToAnswer() {
    this.setState({
      currentCard: fakeData[0].answer
    })
  }

  loadQuestionView() {
    var context = this;
    $.ajax('/api/decks').done(function(decks) {
      context.setState({
        currentCard: decks[0].cards[32].question
        currentDeck: decks[0]
      })
    });
  }
  
  render() {
    return(
      <div>
        <nav>  
        </nav>
        <CardQuestion switchToAnswer={switchToAnswer} currCard={this.state.currentCard } />
      </div>
    )
  }
}