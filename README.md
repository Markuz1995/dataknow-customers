# Customer and Invoice Management Application

This project is a web application for managing customers and invoices, built using Node.js with Express for the backend and React.js for the frontend.

## Project Structure

```
/Frontend (React.js)
├── /public
│   └── index.html
├── /src
│   ├── /components # Reusable components
│   │   ├── CustomerForm.jsx
│   │   └── InvoiceForm.jsx
│   ├── /context # React contexts
│   │   ├── CustomerContext.js
│   │   └── InvoiceContext.js
│   ├── /hooks # Custom hooks
│   │   └── useFetch.js
│   ├── /pages # Application pages
│   │   ├── CustomersPage.jsx
│   │   └── InvoicesPage.jsx
│   ├── /services # Services to communicate with the backend
│   │   ├── customerService.js
│   │   └── invoiceService.js
│   ├── App.jsx # Main application component
│   ├── index.js # React entry point
│   └── index.css # Global styles
├── package.json # Frontend dependencies and scripts

/Backend (Node.js with Express)
├── /config # Database configuration
│   └── config.json
├── /controllers # Route controllers
│   ├── customerController.js
│   └── invoiceController.js
├── /middlewares # Custom middlewares
│   └── errorHandler.js
├── /migrations # Database migrations (created with Sequelize)
├── /models # Sequelize models
│   ├── customer.js
│   └── invoice.js
├── /routes # API routes
│   ├── customerRoutes.js
│   └── invoiceRoutes.js
├── /services # Business logic services
│   └── invoiceService.js
├── /src
│   ├── app.js # Express configuration
│   └── server.js # Server entry point
├── package.json # Backend dependencies and scripts
README.md # Project setup and usage instructions
```

## Getting Started

### Backend Setup

1. Clone the repository and navigate to the `backend` directory.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Configure the database connection in `config/config.json` or use environment variables.
4. Run the database migrations:
   ```bash
   npm run migrate
   ```
5. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the `frontend` directory.
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the frontend application:
   ```bash
   npm start
   ```

## Usage

- Visit `http://localhost:3000` to access the frontend.
- The backend API runs on `http://localhost:5000/api`.

## Development

- **Backend**: Node.js with Express, Sequelize ORM, MySQL.
- **Frontend**: React.js with React Router for navigation.

## Contributing

Feel free to fork this project and submit pull requests. All contributions are welcome!

## License

This project is licensed under the MIT License.
