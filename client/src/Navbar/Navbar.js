import React from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import Home from '../Home';
import Test from '../Test';
import Logs from '../Logs';
const Styles = {
    navSpace:{
        padding: '20px 0px'
    },
    textStyling:{
        fontWeight: '700',
    }
}
const Navbar = () => (
    <Router>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <h6 style={{ color:'#CD040B', fontFamily:'Poppins' }}>Log Mock Demo</h6>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav" style={Styles.navSpace}>
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" style={Styles.textStyling}>Home</Link>
                    </li>

                    <li className="nav-item">
                        <Link to="/logs" className="nav-link" style={Styles.textStyling}>Logs</Link>
                    </li>
       
                                
                </ul>
            </div>
        </nav>
        <Switch>
            <Route exact path="/" component={Home}/> 
            <Route exact path="/logs" component={Logs}/>
            <Route exact path="/test" component={Test}/>
        </Switch>
    </Router>
)
export default Navbar;