const axios = require('axios');
const { Driver, Team } = require('../db');

const driverId = async (id) => {
    try {
        if (isNaN(id)) {
            const response = await axios.get(`http://localhost:5000/drivers/${id}`);
            const data = response.data;

            const idData = {
                id: data.id,
                name: data.name.forename,
                lastname: data.name.surname,
                description: data.description,
                image: data.image.url || "https://imgs.search.brave.com/0UioT8vVlmce4h5d39DNGRcGglPmkMHqhNkRhbp0i6c/rs:fit:860:0:0/g:ce/aHR0cHM6Ly90My5m/dGNkbi5uZXQvanBn/LzA0LzYzLzY2Lzcw/LzM2MF9GXzQ2MzY2/NzAyNl9CNkw4SUd5/MmNnR1lkWU9rTjho/QkU1NUIxenBjVnZE/Yy5qcGc",
                nationality: data.nationality,
                birthdate: data.dob,
                teams: data.teams,
            };

            return idData;
        } else {
            const searchById = await Driver.findByPk(id, {
                include: {
                    model: Team,
                    attributes: ["name"],
                    through: { attributes: [] },
                },
            });

            return searchById;
        }
    } catch (error) {
        throw error;
    }
};

module.exports = driverId;
