import { useState } from 'react'
import { mean, multiply } from 'mathjs'

const Header = (props) => <div><h1>{props.text}</h1></div>

const Display = (props) => <div>{props.stat}: {props.value} {props.unit}</div>

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const avg = mean(good, neutral, bad)
  const percent = multiply(good/total, 100) 
  return (
    <div>
      <Display stat='Good' value={good} />
      <Display stat='Neutral' value={neutral} />
      <Display stat='Bad' value={bad} />
      <Display stat='Total' value={total} />
      <Display stat='Average' value={avg} />
      <Display stat='Percent Positive' value={percent} unit='%' />
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Header text='Give Feedback' />
      <button onClick={() => setGood(good + 1)}>
        Good
      </button>
      <button onClick={() => setNeutral(neutral + 1)}>
        Neutral
      </button>
      <button onClick={() => setBad(bad + 1)}>
        Bad
      </button>

      <Header text='Statisitcs' />
      <Statistics good={good} neutral={neutral} bad={bad} />

    </div>
  )
}

export default App