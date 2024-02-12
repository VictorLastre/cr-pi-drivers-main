const getDriverByIdController = require("../controllers/getDriverIdController");

const getIdDrivers = async (req, res) => {
  const { id } = req.params;
  try {
    if (isNaN(id)) {
      throw new Error("Invalid driver ID");
    }
    const driver = await getDriverByIdController(id);
    res.status(200).json(driver);
  } catch (error) {    
    res.status(500).json({ error: error.message });
  }
};
module.exports = getIdDrivers;
