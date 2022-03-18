import { useState } from 'react'
import { mean, multiply } from 'mathjs'

const Header = (props) => <div><h1>{props.text}</h1></div>

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
      <table>
        <tbody>
          <tr>
            <td>Good</td>
            <td>{good}</td>
          </tr>
          <tr>
            <td>Neutral</td>
            <td>{neutral}</td>
          </tr>
          <tr>
            <td>Bad</td>
            <td>{bad}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{total}</td>
          </tr>
          <tr>
            <td>Average</td>
            <td>{avg}</td>
          </tr>
          <tr>
            <td>Percent Positive</td>
            <td>{percent} %</td>
          </tr>
        </tbody>
      </table>
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