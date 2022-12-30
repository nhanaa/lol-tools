const Draft = require("../models/draftModel");
const mongoose = require("mongoose");

// Save a draft to the database
const createNewDraft = async (req, res) => {
  const {
          draftName,
          blueName,
          redName,
          blueBans: {b1, b2, b3, b4, b5},
          redBans: {r1,r2, r3, r4, r5},
          bluePicks: {B1, B2, B3, B4, B5},
          redPicks: {R1, R2, R3, R4, R5}
        } = req.body;

  // Add new draft to db
  try {
    const user_id = req.user._id;
    console.log(user_id);
    const draft = await Draft.create(
    {
      draftName,
      blueName,
      redName,
      blueBans: {b1, b2, b3, b4, b5},
      redBans: {r1,r2, r3, r4, r5},
      bluePicks: {B1, B2, B3, B4, B5},
      redPicks: {R1, R2, R3, R4, R5},
      user_id
    });
    res.status(200).json(draft);
  }
  catch (err) {
    res.status(400).json({error: err.message});
  }
}

// Fetch all the drafts available by user
const fetchDrafts = async (req, res) => {
  const user_id = req.user._id;

  try {
    const drafts = await Draft.find({user_id}).sort({createdAt: -1});
    res.status(200).json(drafts);
  }
  catch (err) {
    res.status(400).json({error: err.message});
  }
}

// Update the specific draft
const updateDraft = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({error: "No such draft"});
  }

  const draft = await Draft.findOneAndUpdate({_id: id}, {
    ...req.body
  })

  if (!draft) {
    return res.status(400).json({error: "No such draft"});
  }

  res.status(200).json(draft);
}

module.exports = {
  createNewDraft,
  fetchDrafts,
  updateDraft
}
