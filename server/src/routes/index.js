const { Router } = require("express");
const driversRoutes = require('./driverRoutes')
const teamsRoutes = require('./teamRoutes')

const router = Router();

router.use("/drivers", driversRoutes)
router.use("/teams", teamsRoutes);

module.exports = router;
