const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();
//Connect to database
connectDB();

//init middleware
app.use(express.json({ extended: false }));

// app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/services', require('./routes/api/services'));
app.use('/api/location', require('./routes/api/location'));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set the static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
