const axios = require('axios');
const { Driver, Team } = require('../db');

const allDrivers = async () => {
    try {
        let response = await axios.get(`http://localhost:5000/drivers`);
        let results = response.data;

        const drivers = await Promise.all(
            results.map((data) => {
                return {
                    id: data.id,
                    name: data.name.forename,
                    lastname: data.name.surname,
                    description: data.description,
                    image: data.image.url || "https://imgs.search.brave.com/0UioT8vVlmce4h5d39DNGRcGglPmkMHqhNkRhbp0i6c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzYzLzY2Lzcw/LzM2MF9GXzQ2MzY2/NzAyNl9CNkw4SUd5/MmNnR1lkWU9rTjho/QkU1NUIxenBjVnZE/Yy5qcGc",
                    nationality: data.nationality,
                    birthdate: data.dob,
                    teams: data.teams,
                }
            })
        );

        const dbData = await Driver.findAll({
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

        const dbDataDrivers = dbData.map(({ id, name, lastname, description, image, nationality, birthdate, Teams, createDb }) => ({
            id: id,
            name: name,
            lastname: lastname,
            image: image,
            nationality: nationality,
            birthdate: birthdate,
            teams: Teams.map((team) => team.name),
            createDb,
        }));

        return [...dbDataDrivers, ...drivers];
    } catch (error) {
        throw error;
    }
};

module.exports = allDrivers;
