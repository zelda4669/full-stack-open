import { useState } from 'react'
import { floor, random, max } from 'mathjs'

const Header = (props) => <div><h1>{props.text}</h1></div>

const getRandom = () => {
  return (
    floor(random() * 6)
  )
}

const Button = ({ text, handleClick}) => {
  return (
    <div>
      <button onClick={handleClick}>
        {text}
      </button>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  const [selected, setSelected] = useState(0)
  const [clicks, setClicks] = useState(new Uint8Array(anecdotes.length))

  const handler = () => {
    const copy = [...clicks]
    copy[selected] += 1
    setClicks(copy)
  }

  let favorite = clicks.indexOf(max(clicks))

  return (
    <div>
      <Header text='Anecdote of the Day' />
      <p>{anecdotes[selected]}</p>
      <p>This anecdote has {clicks[selected]} votes!</p>
      <Button text='Add Vote' handleClick={handler} />
      <Button text='Next Anecdote' handleClick={() => setSelected(getRandom())} />
      <Header text='Most Loved Anecdote' />
      <p>{anecdotes[favorite]}</p>
      <p>This anecdote has {clicks[favorite]} votes!</p>
    </div>
  )
}

export default App