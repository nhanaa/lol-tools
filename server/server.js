require("dotenv").config();
const express = require("express");
const championsRoutes = require("./routes/champions");

// declare express app
const app = express();

// app.use(express.json());

// printing out the req attributes
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});


// routes
app.use("/api/champions", championsRoutes);

app.listen(process.env.PORT, () => {
  console.log("Listening on port", process.env.PORT);
});
