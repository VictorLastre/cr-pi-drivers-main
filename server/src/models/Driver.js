const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Driver', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notNull: true,
        len: [4, 15],
        notEmpty: {
          msg: "name required",
        },
      },
    },
    lastname: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notNull: true,
        len: [4, 15],
        notEmpty: {
          msg: "lastname required",
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: "https://as2.ftcdn.net/v2/jpg/00/64/67/27/1000_F_64672736_U5kpdGs9keUll8CRQ3p3YaEv2M6qkVY5.jpg",
      validate: {
        isUrl: true,
      },
    },
    nationality: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "nationality is required",
        },
      },
    },
    birthdate: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        notNull: true,
        notEmpty: {
          msg: "birthdate required",
        },
      },
    },
  },
  { freezeTableName: true, timestamps: false }
  );
};
