const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/postRoutes');
const logger = require('./middleware/logger');

const app = express();
const PORT = 5000;

// 🛡️ GLOBAL CORS FIX
app.use(cors({
  origin: '*', // 🔥 Allow ALL origins — use carefully in prod
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: false // ✅ Set to true ONLY if you're using cookies
}));

app.use(bodyParser.json());
app.use(logger);
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

app.get('/', (req, res) => {
  res.send('🩸 BloodConnect API is live');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});