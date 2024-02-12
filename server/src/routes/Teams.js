const { Router } = require("express");
const getAllTeams = require("../handler/getAllTeamsHandler");

const teamsRoutes = Router();

teamsRoutes.get("/", getAllTeams);

module.exports = teamsRoutes;
