import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Airport from './components/Airport';
import Plane from './components/Plane';
import Home from './components/Home';



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/airports" element={<Airport />} />
                <Route path="/planes" element={<Plane />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;