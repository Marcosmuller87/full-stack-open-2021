import React, { useState, useEffect } from "react";
import AddPerson from "./components/AddPerson";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import personService from "./services/persons";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [notification, setNotification] = useState(null);

  // Fetching data from db.json
  useEffect(() => {
    personService.getAll().then((initialList) => {
      setPersons(initialList);
    });
  }, []);

  // Adding new person
  const addPerson = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };

    const existingPerson = persons.find((person) => person.name === newName);

    if (existingPerson) {
      if (
        window.confirm(
          `${newName} is already added to the phonebook. Replace the old number with a new one?`
        )
      ) {
        // Updating existing person
        personService
          .update(existingPerson.id, personObject)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== existingPerson.id ? person : returnedPerson
              )
            );
          })
          .catch((error) => {
            setNotification({
              error: `Information of ${existingPerson.name} has already been removed from the server`,
            });
            setTimeout(() => {
              setNotification(null);
            }, 5000);
            setPersons(
              persons.filter((person) => person.id !== existingPerson.id)
            );
          });
        setNotification({
          message: `Updated ${existingPerson.name}'s number to ${newNumber}`,
        });
        setTimeout(() => {
          setNotification(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      }
    } else {
      personService.create(personObject).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setNotification(`Added ${returnedPerson.name}`);
        setTimeout(() => {
          setNotification(null);
        }, 5000);
        setNewName("");
        setNewNumber("");
      });
    }
  };

  // Deleting person
  const deletePerson = (id) => {
    if (
      window.confirm(
        `Delete ${persons.find((person) => person.id === id).name}?`
      )
    ) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
      });
    }
  };

  // Handlers
  const handleName = (e) => {
    setNewName(e.target.value);
  };

  const handleNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification
        notification={notification?.message || notification?.error}
        className={notification?.message ? "message" : "error"}
      />
      <h2>Filter</h2>
      <Filter persons={persons} handleFilter={handleFilter} />
      <h2>Add a new</h2>
      <AddPerson
        handleName={handleName}
        handleNumber={handleNumber}
        newName={newName}
        newNumber={newNumber}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  );
};

export default App;
