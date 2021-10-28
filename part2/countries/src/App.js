import React, { useState, useEffect } from "react";
import axios from "axios";
import Countries from "./components/Countries";
import Weather from "./components/Weather";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [find, setFind] = useState("");
  const [weather, setWeather] = useState(null);

  // Getting the data from restcountries
  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      if (find.length > 0) {
        setCountries(
          response.data.filter((country) =>
            country.name.toLowerCase().includes(find.toLowerCase())
          )
        );
      }
    });
  }, [find]);

  // Getting the data from weatherstack
  useEffect(() => {
    if (countries.length === 1) {
      const capital = countries[0].capital;
      axios
        .get(
          `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${capital}`
        )
        .then((response) => {
          console.log(response);
          setWeather(response.data);
        });
    }
  }, [countries]);

  // Handlers
  const handleFind = (e) => {
    setFind(e.target.value);
  };

  const handleClick = (e) => {
    setFind(e);
  };

  // App render
  return (
    <div className="App">
      <div>
        Find Countries: &nbsp;
        <input onChange={handleFind} value={find} type="text" />
      </div>
      <Countries countries={countries} handler={handleClick} />
      <Weather weather={weather} countries={countries} />
    </div>
  );
};

export default App;
