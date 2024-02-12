const axios = require('axios');
const { Team } = require('../db');

const allTeams = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/drivers`);
        const drivers = response.data;

        const uniqueTeams = new Set();

        const promises = [];

        drivers.forEach((driver) => {
            if (driver.teams) {
                let teams = driver.teams.split(/\s*,\s*/);

                teams.forEach((teamName) => {
                    if (!uniqueTeams.has(teamName)) {
                        uniqueTeams.add(teamName);
                        promises.push(
                            Team.findOrCreate({
                                where: {
                                    name: teamName,
                                },
                            })
                        );
                    }
                });
            }
        });

        await Promise.all(promises);

        const allDataTeams = await Team.findAll();
        return allDataTeams;
    } catch (error) {
        throw error;
    }
};

module.exports = allTeams;
