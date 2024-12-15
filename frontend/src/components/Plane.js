import React, { useState, useEffect } from 'react';
import { Link} from 'react-router-dom';
import axios from 'axios';
import './Plane.css';

function Plane() {
    const [planes, setPlanes] = useState([]);
    const [name, setName] = useState('');
    const [model, setModel] = useState('');
    const [error, setError] = useState(null);
    

    useEffect(() => {
        axios.get('/planes')
            .then(response => {
                setPlanes(response.data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const plane = { name, model };
        axios.post('/planes', plane)
            .then(response => {
                setPlanes([...planes, response.data]);
                setName('');
                setModel('');
            })
            .catch(error => {
                setError(error.message);
            });
    };

    return (
        <div>
            <nav className="navbar" >
                <Link className="navbar-brand" to="/">Air Traffic Control</Link>
                <div className="collapse">
                    <ul className="navbar-nav" style={{color:'White'}}>
                        <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/airports">Airports</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/planes">Planes</Link></li>
                        <li className="nav-item"><Link className="nav-link" to="/route">Find Shortest Route</Link></li>
                    </ul>
                </div>
            </nav>

            <div className="container mt-4">
                <h1 className="text-center">Manage Planes</h1>
                {error && (
                    <div className="alert alert-danger">
                        <p>{error}</p>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Plane Name</label>
                        <input type="text" id="name" name="name" className="form-control" value={name} onChange={(event) => setName(event.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="model">Plane Model</label>
                        <input type="text" id="model" name="model" className="form-control" value={model} onChange={(event) => setModel(event.target.value)} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Plane</button>
                </form>

                <div className="mt-4">
                    <h2>Existing Planes</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Model</th>
                            </tr>
                        </thead>
                        <tbody>
                            {planes.map((plane) => (
                                <tr key={plane.id}>
                                    <td>{plane.name}</td>
                                    <td>{plane.model}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Plane;