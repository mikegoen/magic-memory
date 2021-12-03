import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard'

const cardImages = [
    { "src": "/img/sword-1.png", matched: false },
    { "src": "/img/helmet-1.png", matched: false },
    { "src": "/img/potion-1.png", matched: false },
    { "src": "/img/ring-1.png", matched: false },
    { "src": "/img/scroll-1.png", matched: false },
    { "src": "/img/shield-1.png", matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))

    setCards(shuffledCards)
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  // compare 2 selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)

      if (choiceOne.src === choiceTwo.src) { // cards match
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else { // no match, flip cards back
        setTimeout(() => resetTurn(), 1000)
      }
    }

  }, [choiceOne, choiceTwo])

  // reset choices and increase turn 
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false)
  }
  
  // useEffect(() => {
  //   shuffleCards()
  // }, [])

  return (
    <div className="App">
      <h1>Cat Match</h1>
      <h2>A different set of cats every time!</h2>
      <button onClick={shuffleCards}>New Game</button>

      <div className="card-grid">
        {cards && cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}  
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default App