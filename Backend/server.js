const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// ✅ Serve static images
app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
const postRoutes = require('./routes/postRoutes');
const authRoutes = require('./routes/authRoutes');

app.use('/posts', postRoutes);
app.use('/auth', authRoutes);

// Root
app.get('/', (req, res) => {
  res.json("home page");
});

// Logging
app.use((req, res, next) => {
  console.log(`🛬 ${req.method} ${req.url}`);
  next();
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});