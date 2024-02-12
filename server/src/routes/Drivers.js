const { Router } = require("express");
const getNameDrivers = require("../handler/getDriverNameHandler");
const postNewDriver = require("../handler/postDriverHandler");
const getAllDrivers = require("../handler/getAllDriversHandler");
const getDriverById = require("../handler/getDriverIdHandler");

const driversRoutes = Router();
driversRoutes.get("/name", getNameDrivers);
driversRoutes.get("/:id", getDriverById);
driversRoutes.get("/", getAllDrivers);
driversRoutes.post("/", postNewDriver);

module.exports = driversRoutes;