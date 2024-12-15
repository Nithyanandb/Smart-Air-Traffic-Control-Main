import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';


function Home() {
    return (
        <div>
         
            <div className="overlay"></div>

           
            <div className="content">
             
            <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
        <div class="container">
            <a class="navbar-brand" href="/">Air Traffic Control</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link" href="/">Home</a></li>
                    <li class="nav-item"><a class="nav-link" href="/airports">Airports</a></li>
                    <li class="nav-item"><a class="nav-link" href="/planes">Planes</a></li>
                    <li class="nav-item"><a class="nav-link" href="/route">Find Route</a></li>
                </ul>
            </div>
        </div>
    </nav>
            
                <div className="container mt-5">
                    <h1 className="text-center">Air Traffic Control System</h1>
                    <p className="text-center">Manage airports, planes, and find the shortest route between airports with this intuitive tool.</p>

                    <div className="row card-section">
                        <div className="col-md-4">
                            <div className="card text-center">
                                <div className="card-body">
                                    <i className="fa-solid fa-building fa-3x mb-3"></i>

                                    <Link to="/airports" className="btn">View All Airports</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center">
                                <div className="card-body">
                                    <i className="fa-solid fa-plane fa-3x mb-3"></i>

                                    <Link to="/planes" className="btn">View All Planes</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="card text-center">
                                <div className="card-body">
                                    <i className="fa-solid fa-route fa-3x mb-3"></i>

                                    <Link to="/route" className="btn">Find Shortest Route</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <p>&copy; 2024 International Air Traffic Control System. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
}

export default Home;