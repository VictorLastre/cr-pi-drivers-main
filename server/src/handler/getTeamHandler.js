const getTeamsController = require('../controllers/teamControllers');

const getTeamHandler = async (req, res) => {
    try {
        const teams = await getTeamsController();
        res.status(200).json(teams);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

module.exports = getTeamHandler;