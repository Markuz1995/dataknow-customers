const app = require('./app');
const { sequelize } = require('../models');

const PORT = process.env.PORT || 5000;

/**
 * Función para iniciar el servidor.
 * 
 * @async
 * @function startServer
 * 
 * Esta función intenta autenticar la conexión con la base de datos utilizando Sequelize.
 * Si la autenticación es exitosa, se inicia el servidor en el puerto especificado.
 * Si ocurre un error al conectar a la base de datos, se muestra un mensaje de error en la consola.
 */
async function startServer() {
  try {
    // Autenticar la conexión con la base de datos
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.');

    // Iniciar el servidor en el puerto especificado
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    // Manejo de errores en la conexión a la base de datos
    console.error('Unable to connect to the database:', error);
  }
}

// Inicia el servidor
startServer();
