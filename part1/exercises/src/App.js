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

const Content = (props) => {

  return (
    <div>
      <Part part={props.part1.name} exercises={props.part1.exercises} />
      <Part part={props.part2.name} exercises={props.part2.exercises} />
      <Part part={props.part3.name} exercises={props.part3.exercises} />
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
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using Props to Pass Data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a Component',
    exercises: 14
  }

  return(
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} />
      <Total num1={part1.exercises} num2={part2.exercises} num3={part3.exercises} />
    </div>
  )
}

export default App