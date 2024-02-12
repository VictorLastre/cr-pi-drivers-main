const createDriverController = require("../controllers/postDriverController");

const postNewDriver = async (req, res) => {
  const { name, lastname, description, image, nationality, birthdate, teams } =
    req.body;
  
  if (!Array.isArray(teams) || teams.length === 0) {
    return res
      .status(400)
      .json({
        error: "The 'teams' field should not be empty and must be an array",
      });
  }
  if (
    !name ||
    !lastname ||
    !description ||
    !image ||
    !nationality ||
    !birthdate
  ) {
    return res
      .status(400)
      .json({ error: "All required fields must be provided" });
  }

  try {    
    const newDriver = await createDriverController(
      name,
      lastname,
      description,
      image,
      nationality,
      birthdate,
      teams
    );
    
    res.status(201).json(newDriver);
  } catch (error) {    
    res.status(500).json({ error: error.message });
  }
};

module.exports = postNewDriver;
