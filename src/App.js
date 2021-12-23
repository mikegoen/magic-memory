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
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("A new set of cats every game!")
  const uniqueCardCount = 6;

  const fetchCats = async () => {
    const url = "https://api.thecatapi.com/v1/images/search?limit="+uniqueCardCount
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
    setLoading(true)
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

  let imgLoadedCounter = 0;
  const handleImgLoaded = () => {
    imgLoadedCounter++;
    if (imgLoadedCounter === uniqueCardCount*2 ) {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) { // two cards have been selected
      setDisabled(true)

      // if cards match, update their state
      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        setMessage("Match!")
        setChoiceOne(null)
        setChoiceTwo(null)
        setTurns(prevTurns => prevTurns + 1)
        setDisabled(false)  
      } 
      // no match, flip cards back
      else { 
        setTimeout(() => {
          setChoiceOne(null)
          setChoiceTwo(null)
          setTurns(prevTurns => prevTurns + 1)
          setDisabled(false)
        }, 1000)
      }
    }
    
  }, [choiceOne, choiceTwo])
  
  useEffect(() => {
    // check if game is won
    if (!cards.some((card) => card.matched===false) && cards.length > 0) { 
      setMessage("Winner! Play Again?")
      setTurns(prevTurns => prevTurns + 1)
    }
  }, [cards])
  
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
            handleImgLoaded={handleImgLoaded}  
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
            loading={loading}
          />
        ))}
      </div>
      {loading && <MessageBox message="Loading cats..." /> }
      <MessageBox message={message}/>
    </div>
  );
}

export default App