const path = require("path");
const express = require("express");
const xss = require("xss");
const notesService = require("./notes-service");

const noteRouter = express.Router();
const bodyParser = express.json();

const serializedNote = (note) => ({
  note_id: note.note_id,
  note_name: xss(note.note_name),
  content: xss(note.content),
  folder_id: note.folder_id,
  modified: note.modified,
});

// create get and post route for /
noteRouter
  .route("/")
  .get((res, res, next) => {
    const db = req.app.get("db");
    notesService
      .getAllNotes(db)
      .then((notes) => {
        res.json(notes.map(serializedNote));
      })
      .catch(next);
  })
  .post();

// create get, delete and patch route for /:note_id
noteRouter
  .route("/:note_id")
  .get((res, res, next) => {})
  .delete()
  .patch();

module.exports = noteRouter;
