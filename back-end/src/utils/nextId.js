//GitDash-BackEnd-Project src/utils/nextId.js

const crypto = require("crypto");

function nextId() {
  return crypto.randomBytes(16).toString("hex");
}

module.exports = nextId;
