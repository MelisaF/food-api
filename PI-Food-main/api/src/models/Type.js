const { DataTypes, Sequelize } = require ('sequelize');

module.exports = (sequelize) => {
    sequelize.define('type', {
        name: {
            type: DataTypes.ARRAY(Sequelize.TEXT),
        }
    })
}