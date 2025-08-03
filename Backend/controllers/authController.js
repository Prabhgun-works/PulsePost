
const fs = require('fs');
const path = require('path');

const usersPath = path.join(__dirname, '../data/Users.json');

function readUsers() {
  if (!fs.existsSync(usersPath)) return [];
  const data = fs.readFileSync(usersPath, 'utf-8');
  return JSON.parse(data);
}

function writeUsers(users) {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
}

const registerUser = (req, res) => {
  const { username, email, password } = req.body;
  const users = readUsers();

  const existing = users.find(u => u.email === email);
  if (existing) return res.status(400).json({ msg: 'User already exists' });

  users.push({ id: Date.now(), username, email, password });
  writeUsers(users);

  res.status(201).json({ msg: 'User registered' });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  const user = users.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ msg: 'Invalid credentials' });

  res.status(200).json({ msg: 'Login successful', user });
};

module.exports = { registerUser, loginUser };