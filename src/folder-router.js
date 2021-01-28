const path = require("path");
const express = require("express");
const xss = require("xss");
const foldersService = require("./folder-service");

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
folderRouter
  .route("/:folder_id")
  .get((req, res, next) => {
    res.json(serializedFolder(res.folder));
  })
  .delete((res, res, next) => {
    foldersService
      .deleteFolder(req.app.get("db"), req.params.folder_id)
      .then(() => {
        // .end() is necessary to end the request response cycle as nothing is sent back using .send()
        res.status(204).end();
      })
      .catch(next);
  })
  .patch(bodyParser, (req, res, next) => {
    // perform folder validation before the patch request
    const { folder_name } = req.body;
    const folderToUpdate = { folder_name };

    const values = Object.values(folderToUpdate).filter(Boolean).length;

    // if the object is empty
    if (values === 0)
      return rest
        .status(400)
        .json({ error: { message: `Request body must have a folder_name.` } });
    foldersService
      .updateFolder(req.app.get("db"), req.params.folder_id, folderToUpdate)
      .then(() => {
        // use .end() to end the request response cycle because nothing is being sent back
        res.status(204).end();
      })
      .catch();
  });

module.exports = folderRouter;
