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

const All = ({ courses }) => {
    return (
        <div>
            {courses.map(course =>
                <Course key={course.id} course={course} />
                )}
        </div>
    )
}

export default All