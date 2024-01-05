const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')
const { limiter, searchLimiter } = require("./src/utils/rateLimiter");
const authRoutes = require("./src/routes/authRoutes");
const noteRoutes = require("./src/routes/noteRoutes");
const searchRoutes = require("./src/routes/searchRoutes");
const dotenv = require('dotenv');
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Database connection establishing
mongoose
  .connect(process.env.MONGO_URI,{
    dbName: "notesapi"
  })
  .then(() => console.log("MongoDB is Running"))
  .catch((err) => console.log(err));


//Authentication Routes
app.use("/api/auth", limiter, authRoutes); //Limiter has 5 request allowed per min

//Authenticated Routes for Notes
app.use("/api", limiter, noteRoutes); //Limiter has 5 request allowed per min
 
//Authenticated Route for searchQuery
app.use("/api", searchLimiter, searchRoutes); //searchLimit has 10 request allowed per min

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
