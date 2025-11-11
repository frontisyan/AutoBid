require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { initDatabase } = require('./config/database-simple'); // Используем упрощенную БД

const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', service: 'auth-service' });
});

// Test route
app.get('/test', (req, res) => {
  res.json({ message: 'Auth service is working!' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error('🚨 Error:', err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3001;

// Initialize and start server
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Auth service running on port ${PORT}`);
    console.log(`📍 Health check: http://localhost:${PORT}/health`);
    console.log(`📍 Test route: http://localhost:${PORT}/test`);
  });
}).catch(error => {
  console.error('❌ Failed to start server:', error);
  process.exit(1);
});