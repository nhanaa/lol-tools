const Draft = require("../models/draftModel");
const mongoose = require("mongoose");

// Save a draft to the database
const createNewDraft = async (req, res) => {
  const {
          blueBans: {b1, b2, b3, b4, b5},
          redBans: {r1,r2, r3, r4, r5},
          bluePicks: {B1, B2, B3, B4, B5},
          redPicks: {R1, R2, R3, R4, R5}
        } = req.body;

  // Add new draft to db
  try {
    const draft = await Draft.create(
    {
      blueBans: {b1, b2, b3, b4, b5},
      redBans: {r1,r2, r3, r4, r5},
      bluePicks: {B1, B2, B3, B4, B5},
      redPicks: {R1, R2, R3, R4, R5}
    });
    res.status(200).json(draft);
  }
  catch (err) {
    res.status(400).json({error: err.message});
  }
}

module.exports = {
  createNewDraft
}
