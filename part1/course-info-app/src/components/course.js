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
  
  const Total = ({ course }) => {
    const listAll = course.parts.map(part => part.exercises)
    const sum = listAll.reduce((t, c) => t + c)

    return(
      <div>
        <p>
          Total Number of Exercises: {sum}
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
            <Total course={course} />
        </div>
    )
}

export default Course