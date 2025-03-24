const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const passport = require('passport');

const app = express();
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';
app.use(morgan(formatsLogger));

const fileRouter = require('./routes/fileRouter');

app.get('/', (req, res) => {
  res.json({message: 'Welcome!'})
})

app.use('/uploads', express.static('uploads'));
app.use('/files', fileRouter)


app.use((req, res) => {
  return res.status(404).json({message: 'Page Not Found'})
})

app.use((err, req, res, next) => {
  console.error('Error occurred:', err.message);
  console.error('Stack trace:', err.stack);
  res.status(500).json({ message: 'Internal ' });
});

module.exports = app;