import { useState, useEffect } from 'react';
import Dice from './Dice';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

function App() {
  const [dice,setDice] = useState(getDiceObj())
  const [isEnded,setIsEnded] = useState(false)
  const [rollsCount,setRollsCount] = useState(0)
  const [timer,setTimer] = useState(0)
  const [gameOver,setGameOver]  = useState(false)
  const [startGame,setStartGame]  = useState(false)
  const [dummyCount,setDummyCount] = useState(0)


 useEffect(() => {
    const firstMatch = dice[0].value;
    const matchedItems =  dice.every(die => die.value ===  firstMatch)
    const isHeldAll =  dice.every(die => die.isHeld)

    if(matchedItems && isHeldAll){
      setIsEnded(true)
    }

    if(isEnded){
      setIsEnded(false)
      setRollsCount(0)
    }

    if(rollsCount > 10 || timer === 20){
      setGameOver(true)
      setRollsCount(0)
      setTimer(0)
      setStartGame(false)
    }

  })



 let countDown;
 useEffect(()  => {
   if(startGame){
    countDown = setInterval(() => {
      setTimer(timer + 1)
    }, 1000)
    return () => clearInterval(countDown)
    }
 })


  function renderGame(){
    setStartGame(true)
    setTimer(1)
    setGameOver(false)
    setDice(getDiceObj())
  }



  function holdDice(id){
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.id === id 
          ?
          {...die,isHeld:!die.isHeld}
          :
        die;
      })
    })
  }


  function rollDice(){
    isEnded ? setDice(getDiceObj())
    :
    setDice(prevDice => {
      return prevDice.map(die => {
        return die.isHeld === false 
          ?
         {
          value:Math.ceil(Math.random() * 6),
          id:nanoid(),
          isHeld: false
          }
          :
        die;
      })
    })
    
  setRollsCount(rollsCount + 1)
  }

  function getDiceObj(){
    const Arr = []
    for (let i = 0;i < 10;i++){
      Arr.push(
        {
          value:Math.ceil(Math.random() * 6),
          id:nanoid(),
          isHeld: false
        }
      )
    }
    return Arr;
  }


  const diceElement = dice.map(die => 
    <Dice 
      value={die.value}
      key={die.id}
      id={die.id}
      isHeld={die.isHeld}
      handleHold={() => holdDice(die.id)}
    />
  )

  const rollsCountStyle = {
    color: rollsCount > 7 ? "red" : "white",
    border: rollsCount > 7 ? "1px solid red" : "1px solid cyan",
  }

  return (
    <>
    {isEnded ?  <Confetti /> :  ""}
    <div className='board'>
      <div className='game-prompt'>
        <p style={{color:"skyblue"}}>TENZIES GAME</p>
        <p>Roll To Match All The Dice</p>
        <p>Beware of the Roll Count And Timer</p>
        {gameOver ? <p className='you-lost'>Sorry You Lost</p> : ""}
      </div>
      
      <p className='timer'>{timer}</p>
      <p className='rollsCount' style={rollsCountStyle}>{rollsCount}</p>
      <div className='dice-container'>
        {timer === 0 ? "" : diceElement}
      </div>

      {timer === 0  || gameOver ? <button onClick={renderGame}>Start Game</button>

        :

        <button onClick={rollDice}>
        {isEnded ? "New  Game" :  "Roll"}
        </button>
      }
    </div>
    </>
  )
}

export default App
