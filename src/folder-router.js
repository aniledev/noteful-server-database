const path = require("path");
const express = require("express");
const xss = require("xss");
const foldersService = require("./folders-service");

const folderRouter = express.Router();
const bodyParser = express.json();

const serializedFolder = (folder) => ({
  folder_id: folder.folder_id,
  folder_name: xss(folder.folder_name),
});

// create get and post routes
folderRouter
  .route("/")
  .get((req, res, next) => {
    const db = req.app.get("db");
    foldersService
      .getAllFolders(db)
      .then((folders) => {
        res.json(folders.map(serializedFolder));
      })
      .catch(next);
  })
  .post(bodyParser, (req, res, next) => {
    const { folder_name } = req.body;
    const newFolder = { folder_name };

    if (!newFolder) {
      return res.status(400).json({
        error: { message: `Missing ${key} in request body.` },
      });
    }
    foldersService
      .insertFolders(res.app.get("db"), newFolder)
      .then((folder) => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${folder.folder_id}`))
          .json(serializedFolder(folder));
      })
      .catch(next);
  });

// create get, delete, and patch routes
folderRouter.route(":folder_id").module.exports = folderRouter;
