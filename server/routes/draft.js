const express = require('express');
const {
  createNewDraft,
  fetchDrafts
} = require('../controller/draftController')

const router = express.Router();

// Contains all routes related to drafts

router.post("/create", createNewDraft); // Save a draft to db

router.get("/fetch", fetchDrafts); // Get drafts in the database

module.exports = router;
