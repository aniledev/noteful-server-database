const path = require("path");
const express = require("express");
const xss = require("xss");
const foldersService = require("./folders-service");

const folderRouter = express.Router();
const jsonParser = express.json();

const serializedFolder = (folder) => ({
  folder_id: folder.folder_id,
  folder_name: xss(folder.folder_name),
});

// create get and post routes
folderRouter.route("/").get((req, res, next) => {
  const db = req.app.get("db");
  foldersService
    .getAllFolders(db)
    .then((folders) => {
      res.json(folders.map(serializedFolder));
    })
    .catch(next);
})


// create get, delete, and patch routes
folderRouter.route(":folder_id").module.exports = folderRouter;
