import React from 'react'
import Die from './components/Die.jsx'
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App() {
  const [tenzies, setTenzies] = React.useState(false)
  const [dice, setDice] = React.useState(allNewDice())

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won!")
  }
  }, [dice])

  function randomNumber(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  function allNewDice() {
    const newDice = []
    for(let i = 0; i < 10; i++) {
      newDice.push(randomNumber(1, 6))
    }
    const dices = newDice.map(num => ({value : num, isHeld: false, id: nanoid()}))
    return dices
  }

  function hold(id) {
    setDice(prevdice => prevdice.map(die => die.id === id ? {...die, isHeld: !die.isHeld} : die))
  }

  function rollDice() {
    if(tenzies) {
      setTenzies(false)
      setDice(allNewDice())
    } else {
      setDice(prevdice => prevdice.map(die => die.isHeld ? die : {...die, value : randomNumber(1, 6)}))
    }
  }
  
  const diceElements = dice.map(die => (<Die key={die.id} value={die.value} isHeld={die.isHeld} holdHandler={() => hold(die.id)}/>))
  
  return (
      <main>
        {tenzies && <Confetti />}
        <div>
        <h1 align="center" className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
        </div>
          <div className="dice-container">
              {diceElements} 
          </div>
          <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
      </main>
  )
}
