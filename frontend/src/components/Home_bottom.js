import React from "react";
import { Link } from "react-router-dom";
import "./Home_bottom.css";

function Home_bottom() {
    return (
        <div>
        <div className="container mt-5">
        <h1 className="text-center">Air Traffic Control System</h1>
        <p className="text-center">
          Manage airports, planes, and find the shortest route between airports
          with this intuitive tool.
        </p>

        <div className="row card-section">
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <i className="fa-solid fa-building fa-3x mb-3"></i>

                <Link to="/airports" className="btn plane-btn py-2">
                  View All Airports
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <i className="fa-solid fa-plane fa-3x mb-3"></i>

                <Link to="/planes" className="btn plane-btn py-2">
                  View All Planes
                </Link>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center">
              <div className="card-body">
                <i className="fa-solid fa-route fa-3x mb-3"></i>

                <Link to="/route" className="btn plane-btn py-2">
                  Find Shortest Route
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <p>
            &copy; 2024 International Air Traffic Control System. All Rights
            Reserved.
          </p>
        </div>
      </footer>
</div>
);
}

export default Home_bottom;
