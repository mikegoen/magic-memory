import { useState } from 'react'
import Game from './components/Game'

import './App.css'

function App() {
  const [choice, setChoice] = useState('')

  return (
    <div className="App">
    
      {!choice && (
        <div className='choosePics'>

          <h3>Choose One:</h3>
          <button onClick={() => setChoice('cats')}>CATS</button>
          <h3>or</h3>
          <button onClick={() => setChoice('dogs')}>DOGS</button>
        </div>
      )}

      {choice && (
        <div className="go-back">
          <button onClick={() => setChoice('')}>{'< '}Go Back</button>
        </div>
      )}

      {choice === 'dogs' && (
        <Game choice='dogs' />
      )}  

      {choice === 'cats' && (
        <Game choice='cats' />
      )}
    </div>
  )  
}

export default App