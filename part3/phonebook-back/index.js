const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

// Midelwares
app.use(express.json());

app.use(cors());

app.use(express.static("build"));

morgan.token("body", (req, res) => JSON.stringify(req.body));
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms :body ")
);

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];
// Main
app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});
// Info Page
app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${persons.length} people</p><p>${new Date()}</p>`
  );
});
// Get all persons
app.get("/api/persons", (request, response) => {
  response.json(persons);
});

// Get single person
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});
// Delete person
app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

// Add new person
app.post("/api/persons", (request, response) => {
  const body = request.body;
  // Generate random id
  const generateId = () => {
    return Math.random() * 1000;
  };
  // Check if name is empty
  if (!body.name) {
    return response.status(400).json({
      error: "name missing",
    });
  }
  // Check if number is empty
  if (!body.number) {
    return response.status(400).json({
      error: "number missing",
    });
  }
  // Check if name is already exists
  const nameExists = persons.find((person) => person.name === body.name);
  if (nameExists) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    date: new Date(),
    id: generateId(),
  };

  persons = persons.concat(person);

  response.json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
