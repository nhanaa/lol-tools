const express = require("express");
const {
  getAllChampions, getSingleChampion
} = require("../controller/championsController");

const router = express.Router();

// Contains all the routes related to champions info

router.get("/", getAllChampions); // get general info of all champs

router.get("/:id", getSingleChampion); // get specific info of a champ


module.exports = router;
