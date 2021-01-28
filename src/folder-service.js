// create method to get all folders using knex
const foldersService = {
  getAllFolders(knex) {
    return knex.select("*").from("folders");
  },
  insertFolder(knex, newFolder) {
    return knex
      .insert(newFolder)
      .into("folders")
      .returning("*")
      .then((rows) => {
        return rows[0];
      });
  },
};
// create method to insert a folder using knex
// create method to get a specific folder
// create method to delete a folder
// create method to update a folder

module.exports = foldersService;
