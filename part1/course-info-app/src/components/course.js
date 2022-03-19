const Header = ({ name }) => {
    return (
      <div>
        <h1>{name}</h1>
      </div>
    )
  }
  
  const Part = ({ part }) => {
    return(
      <div>
        <p>
          {part.name}: {part.exercises}
        </p>
      </div>
    )
  }
  
  const Total = (props) => {
    return(
      <div>
        <p>
          Total Number of Exercises: {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}
        </p>
      </div>
    )
  }



const Course = ({ course }) => {
    return (
        <div>
            <Header name={course.name}/>
            {course.parts.map(part =>
                <Part key={part.id} part={part} />
            )}
        </div>
    )
}

export default Course