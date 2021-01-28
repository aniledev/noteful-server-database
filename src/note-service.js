const { format } = require("morgan");

// create a service to get all notes using knex
const notesService = {
    getAllNotes(knex){ return knex.select("*")from("notes")}
}
// insert a single note using knex
// get a single note by its id
// delete a note by its id



module.exports = notesService;