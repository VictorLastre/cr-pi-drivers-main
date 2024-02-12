const getAllDriversController = require('../controllers/getAllDriversController');

const getAllDrivers = async (req, res) => {
    try {
        const drivers = await getAllDriversController();
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getAllDrivers;
