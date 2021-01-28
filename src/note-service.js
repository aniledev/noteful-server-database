const { format } = require("morgan");

// create a service to get all notes using knex
const notesService = {
  getAllNotes(knex) {
    return knex.select("*").from("notes");
  },
  insertNotes(knex, newNote) {
    return knex
      .insert(newNote)
      .into("notes")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
  getNoteId(knex, id) {
    return knex.from("notes").where("note_id", id).first();
  },
};
// insert a single note using knex
// get a single note by its id
// delete a note by its id

module.exports = notesService;
