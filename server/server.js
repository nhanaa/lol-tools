require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const championsRoutes = require("./routes/champions");
const draftRoutes = require("./routes/draft");
const userRoutes = require("./routes/users")

// declare express app
const app = express();

// resolve CORS issues
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

// printing out the req attributes
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/champions", championsRoutes);
app.use("/api/draft", draftRoutes);
app.use("/api/users", userRoutes);

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
