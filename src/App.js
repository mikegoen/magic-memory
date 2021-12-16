import { useEffect, useState } from 'react'
import MessageBox from './components/MessageBox'
import SingleCard from './components/SingleCard'

import './App.css'


function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [message, setMessage] = useState("A new set of cats every game!")

  const fetchCats = async () => {
    const url = "https://api.thecatapi.com/v1/images/search?limit=6"
    setMessage("Loading Cats...")
    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      const data = await res.json()

      return data
    } catch {
      setMessage("Error fetching cats 😪")
    }

  }

  const shuffleCards = () => {
    setCards([])
    fetchCats()
      .then(data => {
        const catCards = data.map(cat => {
          return {src: cat.url, matched: false}
        })
        const shuffledCards = [...catCards, ...catCards]
          .sort(() => Math.random() - 0.5)
          .map((card) => ({ ...card, id: Math.random() }))
    
        setCards(shuffledCards)
        setMessage(null)
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(0)    
      })
  }

  const handleChoice = (card) => {
    setMessage(null)
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
        setMessage("Match!")
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
  
  return (
    <div className="App">
      <header>
        <h1>Cat Match</h1>
        <span className='turns'>Turns: {turns}</span>
        <button onClick={shuffleCards}>New Game</button>
      </header>

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
      <MessageBox message={message}/>
    </div>
  );
}

export default App