// server.js
require('dotenv').config();
const express  = require('express');
const mongoose = require('mongoose');
const path     = require('path');
const cors     = require('cors');
const helmet   = require('helmet');
const rateLimit = require('express-rate-limit');

// Routers
const batchesRouter     = require('./routes/batches');
const testsRouter       = require('./routes/tests');
const questionsRouter   = require('./routes/questions');
const chaptersRouter    = require('./routes/chapters');
const testSeriesRouter  = require('./routes/testSeries');

const app = express();

// Security Middleware
app.use(helmet()); // Sets secure HTTP headers
app.use(cors({
  origin: ['https://yourdomain.com'], // Replace with your actual frontend domain
  optionsSuccessStatus: 200
}));
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Route Mounts
app.use('/api/batches',    batchesRouter);
app.use('/api/tests',      testsRouter);
app.use('/api/questions',  questionsRouter);
app.use('/api/chapters',   chaptersRouter);
app.use('/api/testSeries', testSeriesRouter);

// Fallback route (optional if SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`🚀 Server running on http://localhost:${port}`);
});
