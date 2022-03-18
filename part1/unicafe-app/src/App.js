import { useState } from 'react'
import { mean, multiply } from 'mathjs'

const Header = (props) => <div><h1>{props.text}</h1></div>

const StatisticLine = (props) => <div>{props.stat}: {props.value} {props.unit}</div>

const Button = ({ text, handleClick}) => {
  return (
    <div>
      <button onClick={handleClick}>
        {text}
      </button>
    </div>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const avg = mean(good, neutral, bad)
  const percent = multiply(good/total, 100) 
  if (total === 0) {
    return (
      <div>
        No feedback yet!
      </div>
    )
  }
  return (
    <div>
      <StatisticLine stat='Good' value={good} />
      <StatisticLine stat='Neutral' value={neutral} />
      <StatisticLine stat='Bad' value={bad} />
      <StatisticLine stat='Total' value={total} />
      <StatisticLine stat='Average' value={avg} />
      <StatisticLine stat='Percent Positive' value={percent} unit='%' />
    </div>
  )
}

const App = () => {
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const handleGoodClick = () => 
    setClicks({ ...clicks, good: clicks.good + 1 })

  const handleNeutralClick = () => 
    setClicks({ ...clicks, neutral: clicks.neutral + 1 })

  const handleBadClick = () => 
    setClicks({ ...clicks, bad: clicks.bad + 1 })

  return (
    <div>
      <Header text='Give Feedback' />
      <Button text='Good' handleClick={handleGoodClick} />
      <Button text='Neutral' handleClick={handleNeutralClick} />
      <Button text='Bad' handleClick={handleBadClick} />
      <Header text='Statisitcs' />
      <Statistics good={clicks.good} neutral={clicks.neutral} bad={clicks.bad} />

    </div>
  )
}

export default App