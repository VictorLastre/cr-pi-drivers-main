const { Router } = require("express");
const driversRoutes = require("./Drivers");
const teamsRoutes = require("./Teams");

const router = Router();

router.use("/drivers", driversRoutes);
router.use("/teams", teamsRoutes);

module.exports = router;
