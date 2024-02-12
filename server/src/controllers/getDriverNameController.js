const axios = require('axios');
const { Driver, Team } = require('../db');
const { Op } = require('sequelize');

const driverName = async (name) => {
    const lowercaseName = name.toLowerCase();

    const dbDriversPromise = Driver.findAll({
        where: {
            name: {
                [Op.like]: `%${lowercaseName}%`,
            },
        },
        include: [
            {
                model: Team,
                attributes: ["name"],
                through: {
                    attributes: [],
                },
            },
        ],
    });

    const apiResponsePromise = axios.get(`http://localhost:5000/drivers`);

    const [dbDrivers, apiResponse] = await Promise.all([dbDriversPromise, apiResponsePromise]);

    const apiDrivers = apiResponse.data.filter((driver) =>
        driver.name.forename.toLowerCase().includes(lowercaseName)
    );

    const apiDataDrivers = apiDrivers.map((driver) => ({
        id: driver.id,
        name: driver.name.forename,
        lastname: driver.name.surname,
        description: driver.description,
        image: driver.image.url || "https://imgs.search.brave.com/0UioT8vVlmce4h5d39DNGRcGglPmkMHqhNkRhbp0i6c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzYzLzY2Lzcw/LzM2MF9GXzQ2MzY2/NzAyNl9CNkw4SUd5/MmNnR1lkWU9rTjho/QkU1NUIxenBjVnZE/Yy5qcGc",
        nationality: driver.nationality,
        birthdate: driver.dob,
        teams: driver.teams,
    }));

    const dbDataDrivers = dbDrivers.map((driver) => ({
        id: driver.id,
        name: driver.name,
        lastname: driver.lastname,
        description: driver.description,
        image: driver.image,
        nationality: driver.nationality,
        birthdate: driver.birthdate,
        teams: driver.Teams.map((team) => team.name),
    }));

    if (!apiDataDrivers.length && !dbDataDrivers.length)
        throw new Error("Driver does not exist");

    return [...apiDataDrivers, ...dbDataDrivers].slice(0, 15);
};

module.exports = driverName;
