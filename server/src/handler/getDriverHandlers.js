const { getDrivers } = require('../controllers/driverController');

const getDriversHandler = async (req, res) => {
    try{
        const {name} = req.query;
        const drivers = await getDrivers(name);
        res.status(200).json(drivers);
    }catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = getDriversHandler;