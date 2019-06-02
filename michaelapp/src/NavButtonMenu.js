import React from 'react';
import ReactDOM from 'react-dom';
import './NavButtonMenu.css';
import App from './App';
import * as serviceWorker from './serviceWorker';







function NavButtonMenu() {

    return (

        <div className="buttonWrapper">
            <div className="btn-group">
                <button className="button button1">Flash Chat</button>
                <button className="button button2">Log In</button>
                <button className="button button3">Sign Up</button>
            </div>
        </div>)
}





export default NavButtonMenu;