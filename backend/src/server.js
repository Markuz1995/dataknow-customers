const app = require('./app');
const db = require('../models');

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await db.sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

startServer();
