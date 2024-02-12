const { Driver, Team } = require('../db');
const Sequelize = require('sequelize');

const createDriver = async (
    name, lastname, description, image, nationality, birthdate, teams
) => {
    try {
        if (!name || !lastname || !description || !image || !nationality || !birthdate || !teams) {
            throw new Error("Missing required data");
        }

        const newDriver = await Driver.create({
            name, lastname, description, image, nationality, birthdate
        });

        const associatedTeams = await Team.findAll({
            where: {
                name: {
                    [Sequelize.Op.in]: teams,
                },
            },
        });

        await newDriver.addTeams(associatedTeams);

        const driverWithTeams = await Driver.findOne({
            where: { id: newDriver.id },
            include: {
                model: Team,
                attributes: ["name"],
                through: { attributes: [] },
            },
        });

        return driverWithTeams;
    } catch (error) {
        throw error;
    }
};

module.exports = createDriver;
