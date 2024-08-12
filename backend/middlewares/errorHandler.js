/**
 * Middleware para manejar errores en la aplicación Express.
 * 
 * Este middleware captura cualquier error que ocurra en la aplicación, registra la pila de errores en la consola,
 * y envía una respuesta JSON al cliente con el código de estado HTTP adecuado y un mensaje de error.
 * 
 * @function errorHandler
 * @param {Object} err - El objeto de error capturado.
 * @param {Object} req - El objeto de solicitud de Express.
 * @param {Object} res - El objeto de respuesta de Express.
 * @param {function} next - La función middleware de Express para pasar el control al siguiente middleware (en caso de que sea necesario).
 * 
 * @returns {void} Retorna una respuesta JSON con el código de estado y el mensaje de error.
 */
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    error: {
      message,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    },
  });
};

module.exports = errorHandler;
