import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Airport from './components/Airport';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/airports" element={<Airport />} />
            </Routes>
        </Router>
    );
};

export default App;
