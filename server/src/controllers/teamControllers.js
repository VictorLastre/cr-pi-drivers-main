const axios = require("axios");
const { Team } = require('../db.js');

const getTeamsController = async () => {
    const teamDB = await Team.findAll();

    if (!teamDB.length) {
        const { data } = await axios.get("http://localhost:5000/drivers");
        const teamsData = [];

        data.forEach((driver) => {
            if (driver.teams) {
                const teamSplit = driver.teams.split(/\s*,\s*/);
                teamSplit.forEach((team) => teamsData.push(team));
            }            
        });

        const teamUnique = new Set(teamsData);
        const teams = [...teamUnique];

        for (const team of teams) {
            await Team.findOrCreate({
                where: { name: team },
            });
        }
        return teams;
    }
    return teamDB.map((team) => team.name);
};

module.exports = getTeamsController;
