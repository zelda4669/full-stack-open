const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>
        {props.part}: {props.exercises}
      </p>
    </div>
  )
}

const Content = () => {
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using Props to Pass Data'
  const exercises2 = 7
  const part3 = 'State of a Component'
  const exercises3 = 14

  return (
    <div>
      <Part part={part1} exercises={exercises1} />
      <Part part={part2} exercises={exercises2} />
      <Part part={part3} exercises={exercises3} />
    </div>
  )
}

const Total = (props) => {
  return(
    <div>
      <p>
        Total Number of Exercises: {props.num1 + props.num2 + props.num3}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack Application Development'
  const exercises1 = 10
  const exercises2 = 7
  const exercises3 = 14

  return(
    <div>
      <Header course={course} />
      <Content />
      <Total num1={exercises1} num2={exercises2} num3={exercises3} />
    </div>
  )
}

export default App