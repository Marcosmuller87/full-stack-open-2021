const Countries = ({ countries, handler }) => {
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter.</div>;
  } else if (countries.length > 1 && countries.length < 10) {
    return countries.map((country) => (
      <div key={country.numericCode}>
        <p>{country.name}</p>
        <button onClick={() => handler(country.name)}>Show</button>
      </div>
    ));
  } else if (countries.length === 1) {
    return countries.map((country) => (
      <div key={country.numericCode}>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Population: {country.population}</p>
        <h2>Spoken Languages:</h2>
        <ul>
          {country.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt="Flag-Img" width="200" height="150" />
      </div>
    ));
  } else return null;
};

export default Countries;
