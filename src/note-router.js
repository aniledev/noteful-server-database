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
  .get((req, res, next) => {
    const db = req.app.get("db");
    notesService
      .getAllNotes(db)
      .then((notes) => {
        res.json(notes.map(serializedNote));
      })
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    // use object destructing to access the req body and the newNote object
    const { note_name, content, folder_id } = req.body;
    const newNote = { note_name, content, folder_id };

    // validate to ensure that each field of the request body is present/entered
    for (const [key, value] of Object.entries(newNote))
      if (value == null)
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` },
        });

    notesService
      .insertNotes(req.app.get("db"), newNote)
      .then((note) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${note.note_id}`))
          .json(serializedNote(note));
      })
      .catch(next);
  });

// create get, delete and patch route for /:note_id
noteRouter
  .route("/:note_id")
  .get((req, res, next) => {})
  .delete()
  .patch();

module.exports = noteRouter;
