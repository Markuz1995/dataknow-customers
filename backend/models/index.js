'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

/**
 * Inicializa la instancia de Sequelize dependiendo del entorno de ejecución.
 * Si `use_env_variable` está definido en la configuración, utiliza esa variable de entorno.
 * De lo contrario, utiliza las credenciales de la base de datos proporcionadas en el archivo de configuración.
 */
let sequelize;
if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

/**
 * Lee todos los archivos de modelo en el directorio actual (excluyendo este archivo),
 * e importa y define cada modelo en la instancia de Sequelize.
 */
fs
    .readdirSync(__dirname)
    .filter(file => {
        return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        db[model.name] = model;
    });

/**
 * Recorre todos los modelos definidos y ejecuta su método `associate` si está presente,
 * estableciendo las relaciones entre los modelos.
 */
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

/**
 * Exporta la instancia de Sequelize y todos los modelos definidos.
 * 
 * @type {Object}
 * @property {Sequelize} sequelize - La instancia de Sequelize.
 * @property {Object} db - Un objeto que contiene todos los modelos definidos en la aplicación.
 */
db.sequelize = sequelize;

module.exports = db;
