const express = require('express');
const {
  createNewDraft,
  fetchDrafts,
  updateDraft,
  deleteDraft
} = require('../controller/draftController')
const requireAuth = require("../middleware/requireAuth");


const router = express.Router();

// Contains all routes related to drafts

// Require auth for all workouts routes
router.use(requireAuth);

router.post("/create", createNewDraft); // Save a draft to db

router.get("/fetch", fetchDrafts); // Get drafts in the database for a user

router.patch("/update/:id", updateDraft); // Update an existing draft

router.delete("/delete/:id", deleteDraft); // Delete an existing draft

module.exports = router;
