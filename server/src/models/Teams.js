const {DataTypes} = require("sequelize");

module.exports = (sequelize) => {
    sequelize.define("Team", {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            validate: {
                notEmpty: {
                    msg: "name required",
                },
            },
        },
    },
    { freezeTableName: true, timestamps: false }
    );
};
