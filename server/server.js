const express = require("express");
const cors = require("cors");
const morgan = require('morgan');
const db = require("./app/models/index");
const tourRoutes = require('./app/routes/tourRoutes');
const app = express();
var corsOptions = {
  origin: "http://localhost:54898"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
app.use(morgan('dev'));
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use('/tours', tourRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});