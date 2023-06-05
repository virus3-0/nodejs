const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// In-memory storage for subjects and classes
let subjects = [];

// Create a new subject
app.post('/subjects', (req, res) => {
  const { id, name, isGraded, assignedClasses } = req.body;
  const newSubject = { id, name, isGraded, assignedClasses };
  subjects.push(newSubject);
  res.status(201).json(newSubject);
});

// Get all subjects
app.get('/subjects', (req, res) => {
  res.json(subjects);
});

// Update a subject
app.put('/subjects/:id', (req, res) => {
  const { id } = req.params;
  const { name, isGraded, assignedClasses } = req.body;

  const subject = subjects.find(s => s.id === parseInt(id));
  if (!subject) {
    return res.status(404).json({ error: 'Subject not found' });
  }

  subject.name = name || subject.name;
  subject.isGraded = isGraded !== undefined ? isGraded : subject.isGraded;
  subject.assignedClasses = assignedClasses || subject.assignedClasses;

  res.json(subject);
});

// Delete a subject
app.delete('/subjects/:id', (req, res) => {
  const { id } = req.params;

  subjects = subjects.filter(s => s.id !== parseInt(id));

  res.sendStatus(204);
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});