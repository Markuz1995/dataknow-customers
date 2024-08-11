import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CustomersPage from './pages/CustomersPage';
import InvoicesPage from './pages/InvoicesPage';

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/customers" component={CustomersPage} />
                <Route path="/invoices" component={InvoicesPage} />
                <Route path="/" exact component={CustomersPage} />
            </Switch>
        </Router>
    );
};

export default App;
