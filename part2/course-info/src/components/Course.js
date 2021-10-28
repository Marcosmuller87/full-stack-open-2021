const Course = ({ course }) => {
  const total = course.parts.reduce((acc, item) => {
    return (acc += item.exercises);
  }, 0);
  return (
    <>
      <Header title={course.name} />
      <Content courses={course} />
      <p>
        <strong>Total of {total} exercises.</strong>
      </p>
    </>
  );
};

const Header = ({ title }) => {
  return <h2>{title}</h2>;
};

const Content = ({ courses }) => {
  const parts = courses.parts;
  return (
    <>
      {parts.map((part) => {
        return (
          <Part key={part.id} name={part.name} exercises={part.exercises} />
        );
      })}
    </>
  );
};

const Part = ({ name, exercises }) => {
  return (
    <div>
      {name}:&nbsp;{exercises}
    </div>
  );
};

export default Course;
