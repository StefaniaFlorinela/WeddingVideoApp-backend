const app = require("./app");
const mongoose = require('mongoose');
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const URI = process.env.URI_MONGOBD;

mongoose.connect(URI, {
  dbName: "Files",
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected at MongoDB successfully!')
  })
  .catch((error) => {
    console.error('Database connection error', error)
  });

app.listen(PORT, () => {
  console.log(`Server is running. Use our API on port: ${PORT}`);
});