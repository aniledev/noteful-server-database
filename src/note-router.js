const path = require('path');
const express = require('express');
const xss = require('xss');
const notesService = require('./notes-service');

const noteRouter = express.Router();
const bodyParser = express.json();

const serializedNote = note => ({
    note_id : note.note_id,
    note_name : xss(note.note_name),
    content : xss(note.content),
    folder_id : note.folder_id,
    modified : note.modified,
})

// create get and post route for /

// create get, delete and path route for /:note_id
