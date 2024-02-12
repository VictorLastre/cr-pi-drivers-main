const {Router} = require('express');
const getDriverHandler = require('../handler/getDriverHandlers.js');
const getDriverIdHandler = require('../handler/getDriverIdHandler.js');
const postDriverHandler = require('../handler/postDriverHandler.js');

const driversRouter = Router();

driversRouter.get("/", getDriverHandler);
driversRouter.get("/:id", getDriverIdHandler);
driversRouter.post("/", postDriverHandler);

module.exports = driversRouter;
