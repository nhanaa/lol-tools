const express = require('express');
const {
  createNewDraft
} = require('../controller/draftController')

const router = express.Router();

// Contains all routes related to drafts

router.post("/create", createNewDraft); // Save a draft to db

module.exports = router;
