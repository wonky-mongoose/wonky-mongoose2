
const CardQuestion = ({switchToAnswer, currCard}) => (
  <div className="container">
    <h1 className="center">{currCard.question}</h1>
    <div className="row center">
      <button onClick={() => switchToAnswer()}>Go</button>
    </div>
  </div>
);

export default CardQuestion;
