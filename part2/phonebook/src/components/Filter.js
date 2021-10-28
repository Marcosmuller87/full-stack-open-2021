const Filter = ({ handleFilter }) => {
  return (
    <div>
      Filter by name: <input onChange={handleFilter} type="text" />
    </div>
  );
};

export default Filter;
