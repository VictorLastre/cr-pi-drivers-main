const getDriverByNameController = require("../controllers/getDriverNameController");

const getNameDrivers = async (req, res) => {
    const { name } = req.query;

    try {
        if (!name) {
        throw new Error("Name parameter is required");
        }
        const drivers = await getDriverByNameController(name);
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = getNameDrivers;
