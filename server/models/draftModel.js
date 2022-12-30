const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const draftSchema = new Schema({
  "draftName": "String",
  "blueName": "String",
  "redName": "String",
  "blueBans": {
    "b1": {
      "type": [
        "Mixed"
      ]
    },
    "b2": {
      "type": [
        "Mixed"
      ]
    },
    "b3": {
      "type": [
        "Mixed"
      ]
    },
    "b4": {
      "type": [
        "Mixed"
      ]
    },
    "b5": {
      "type": [
        "Mixed"
      ]
    }
  },
  "redBans": {
    "r1": {
      "type": [
        "Mixed"
      ]
    },
    "r2": {
      "type": [
        "Mixed"
      ]
    },
    "r3": {
      "type": [
        "Mixed"
      ]
    },
    "r4": {
      "type": [
        "Mixed"
      ]
    },
    "r5": {
      "type": [
        "Mixed"
      ]
    }
  },
  "bluePicks": {
    "B1": {
      "type": [
        "Mixed"
      ]
    },
    "B2": {
      "type": [
        "Mixed"
      ]
    },
    "B3": {
      "type": [
        "Mixed"
      ]
    },
    "B4": {
      "type": [
        "Mixed"
      ]
    },
    "B5": {
      "type": [
        "Mixed"
      ]
    }
  },
  "redPicks": {
    "R1": {
      "type": [
        "Mixed"
      ]
    },
    "R2": {
      "type": [
        "Mixed"
      ]
    },
    "R3": {
      "type": [
        "Mixed"
      ]
    },
    "R4": {
      "type": [
        "Mixed"
      ]
    },
    "R5": {
      "type": [
        "Mixed"
      ]
    },
  },
  "user_id": {
    "type": "String",
    "required": "true"
  }
}, { timestamps: true });

module.exports = mongoose.model("Draft", draftSchema);
