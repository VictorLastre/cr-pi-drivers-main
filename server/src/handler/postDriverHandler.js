const {createDriver} = require('../controllers/driverController');

const postDriverHandler = async (req, res) => {
    try {
        const data = req.body;
        const newDriver = await createDriver(data);
        res.status(201).json(newDriver);
    } catch (error) {
        res.status(404).json({error: error.message});
    }
};

module.exports = postDriverHandler;