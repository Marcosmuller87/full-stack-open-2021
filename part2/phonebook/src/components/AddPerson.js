const AddPerson = ({
  newName,
  newNumber,
  handleName,
  handleNumber,
  addPerson,
}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleName} type="text" />
      </div>
      <div>
        number:
        <input value={newNumber} onChange={handleNumber} type="number" />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default AddPerson;
