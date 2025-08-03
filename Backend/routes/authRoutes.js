const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const usersFile = path.join(__dirname, '../data/users.json');

// Helper: Read users from file
function readUsers() {
  const data = fs.readFileSync(usersFile);
  return JSON.parse(data);
}

// Helper: Write users to file
function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}


// ✅ SIGNUP ROUTE
router.post('/signup', (req, res) => {
  console.log('Signup request:', req.body); // ✅ LOG THIS

  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ message: 'All fields required' });

  const users = readUsers();
  const userExists = users.find(user => user.email === email);

  if (userExists)
    return res.status(409).json({ message: 'User already exists' });

  users.push({ name, email, password });
  writeUsers(users);

  res.status(201).json({ message: 'Signup successful' });
});
router.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

// ✅ LOGIN ROUTE
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const users = readUsers();
  const user = users.find(u => u.email === email && u.password === password);

  if (!user)
    return res.status(401).json({ message: 'Invalid email or password' });

  res.status(200).json({ message: 'Login successful', user });
});

module.exports = router;