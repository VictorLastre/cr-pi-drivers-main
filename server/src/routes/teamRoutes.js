const {Router} = require("express");
const getTeamHandler = require('../handler/getTeamHandler.js');

const teamsRoutes = Router();

teamsRoutes.get("/", getTeamHandler);

module.exports = teamsRoutes;
