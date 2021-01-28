const path = require('path');
const express = require('express');
const xss = require('xss');
const foldersService  = require('./folders-service');


const folderRouter = express.Router();
const jsonParser = express.json();

const serializedFolder = folder => ({
    folder_id : folder.folder_id,
    folder_name : xss(folder.folder_name)
});

