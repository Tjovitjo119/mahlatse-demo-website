const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Store messages (in memory for demo)
let messages = [];
let visitors = 0;

// HOME ROUTE
app.get('/api/welcome', (req, res) => {
  visitors++;
  res.json({
    message: 'Welcome to Mahlatse Ragophala Demo Website!',
    visitors: visitors
  });
});

// CONTACT FORM ROUTE
app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required!' });
  }

  const newMessage = {
    id: messages.length + 1,
    name,
    email,
    message,
    date: new Date().toLocaleString()
  };

  messages.push(newMessage);
  console.log('New message received:', newMessage);

  res.json({ success: true, reply: `Thanks ${name}! Your message was received.` });
});

// ADMIN - GET ALL MESSAGES
app.get('/api/admin/messages', (req, res) => {
  res.json({ total: messages.length, messages });
});

// ADMIN - GET STATS
app.get('/api/admin/stats', (req, res) => {
  res.json({
    totalMessages: messages.length,
    totalVisitors: visitors,
    websiteName: 'Mahlatse Ragophala Demo',
    status: 'Running ✅'
  });
});

// START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
