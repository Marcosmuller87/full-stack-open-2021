const Persons = ({ persons, filter, deletePerson }) => {
  const showFiltered = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      {showFiltered.map((person) => (
        <div key={person.name}>
          <p>
            {person.name}:&nbsp;
            {person.number}&nbsp;
            <button onClick={() => deletePerson(person.id)}>Delete</button>
          </p>
        </div>
      ))}
    </div>
  );
};

export default Persons;
