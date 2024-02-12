const {sequelize, Sequelize}  = require('sequelize');
const {Driver, Team} = require('../db');
const axios = require('axios');

const createDriver = async({
    name,
    lastname,
    description,
    image,
    nacionality,
    birthdate,
    Teams,
}) => {
    if(
    !name ||
    !lastname ||
    !description ||
    !image ||
    !nacionality ||
    !birthdate ||
    !Teams
    )
    throw Error("Missing dates");

    const newDriver = await Driver.create({
        name,
        lastname,
        description,
        image,
        nacionality,
        birthdate,
    });

    const teamsDB = await Team.findAll({
        where: {
            name: {
                [Sequelize.Op.in]: Teams,
            },
        },
    });
    await newDriver.addTeam(teamsDB);
    return newDriver;
};

const getDriversDB = async () => {
    const driversDB = await Driver.findAll({
        include: {
            model: Team,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        },
    });
    const driversDBmap = driversDB.map((driver) => {
        return{
            id: driver.id,
            name: driver.name,
            lastname: driver.lastname,
            description: driver.description,
            image: driver.image,
            nacionality: driver.nacionality,
            birthdate: driver.birthdate,
            Teams: driver.map((team) => { team.name }),
        };
    });
    return driversDBmap;
    };   

    const getDriversApi = async () => {
        const {data} = await axios("http://localhost/drivers");
        const datamap = data.map((driver) => {
            return{
                id: driver.id,
                name: driver.name.name,
                lastname:driver.name.lastname,
                description: driver.description,
                image: driver.image.url.length
                    ? driver.image.url
                    : "https://as2.ftcdn.net/v2/jpg/00/64/67/27/1000_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg",
                nacionality: driver.nacionality,
                birthdate: driver.dob,
                Teams: driver.teams?.split(/\s*,\s*/),
            };
        });
        return datamap;
    };

    const getDrivers = async (name) => {
        const driversDB = await getDriversDB();
        const driversApi = await getDriversApi();
        const drivers = [...driversDB, ...driversApi];
        if(name){
            const driverFound = drivers.filter((d) => 
            d.name.toLowerCase().includes(name.toLowerCase()));
            
            if(!driverFound.length)
                throw Error(`Driver call '${name}' not found`);
                const driverSlice = driverFound.slice(0, 15);
                return driverSlice;            
        }
        return drivers;
    };

    const getDriversById = async (id) => {
        if(isNaN(id)) {
            const drivers = await getDriversDB();
            const driverFound = drivers.find((driver) => driver.id === id);
            if(!driverFound) throw Error('Driver not found');
            return driverFound;
        }
        
        const drivers = await getDriversApi();
        const driverFound = drivers.find((driver) => driver.id == id);
        if(!driverFound) throw Error('Driver not found');
        return driverFound;
    };

    module.exports = {
        createDriver,
        getDrivers,
        getDriversById
    };