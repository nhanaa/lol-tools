require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const championsRoutes = require("./routes/champions");
const draftRoutes = require("./routes/draft");

// declare express app
const app = express();

app.use(express.json());

// printing out the req attributes
app.use((req, res, next) => {
  console.log(req.path, req.method);
  console.log(req.body);
  next();
});

// routes
app.use("/api/champions", championsRoutes);
app.use("/draft", draftRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log("Listening on port", process.env.PORT);
    });
  })
  .catch((err) => console.log(err));
