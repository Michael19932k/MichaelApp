import React from 'react';
import ReactDOM from 'react-dom';
import './ChatBox.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { defaultCipherList } from 'constants';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";



function ChatBox() {
    return (
        <div className="gridWrapper">
            <div className="original-grid-container">
                <div className="NickNamesArea"></div>
                <div className="ChatArea"></div>
                <div class="ChatInputArea"><form className="messageInputWrapper">
                    <textarea className="messageTypingSpot" type="text">
                    </textarea><input className="ChatInputButton" type="submit" value="Enter"></input></form></div>

            </div>
        </div>








    )
}





export default ChatBox;