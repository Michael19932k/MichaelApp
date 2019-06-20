import ReactDOM from 'react-dom';
import './ChatBox.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { defaultCipherList } from 'constants';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { animateScroll as scroll } from "react-scroll";

const io = require("socket.io-client")
const socket = socketIOClient('http://localhost:4000/');
let tempSocketMessages = [];
let tempSocketNames = [];
let counter = 0;
let counterr = 0;

function ChatBox({ match }, e, props) {
    let name = localStorage.getItem("name");
    const [newMsgs, setNewMsgs] = useState(0);
    const [newNames, setnewNames] = useState(0);
    const [messages, setMessages] = useState([]);
    const containerRef = useRef(null);
    let room = match.params.id


    useEffect(() => {
       
        // fetch('http://localhost:4000/messages', {
        //     method: 'POST',
        //     body: JSON.stringify({ name }),
        //     headers: {
        //         'Content-Type': 'application/json'
        //     }
        // }).then(res => res.json())
        //     .then(response => {
        //         let newOrder = response.messages.reverse();
        //         setMessages(response.messages);
        //     })
        //     .catch(error => console.error('Error:', error))    

        
        socket.on('message', function (data) {
            console.log(data);
            tempSocketMessages.push(data.message)
            setNewMsgs(counter + 1);
            counter++;
            console.log(newMsgs)
        });
        socket.on('subscribe', function (name) {
            tempSocketNames.push(name)
            setnewNames(counterr + 1);
            counterr++;
            console.log(newNames)
        });

        socket.emit('subscribe',name);
        
    }, []);

    useEffect(() => {

        scroll.scrollToBottom()

    })

    return (
        <div className="gridWrapper">
            <div className="original-grid-container">
                <div className="NickNamesArea">
                {
                        messages.map((message, sidename) => {

                            return <p key={sidename}>{message.name}</p>
                        })
                    }
                    {
                        tempSocketNames.map((message, sidename) => {
                         
                            return <p key={sidename + 'socket'}>{message.name}</p>
                        })
                    }
                </div>
                <div className="ChatArea">
                    {
                        messages.map((message, index) => {

                            return <p key={index}>{message.message}</p>
                        })
                    }
                    {
                        tempSocketMessages.map((message, index) => {
                            console.log(message)
                            return <p key={index + 'socket'}>{message}</p>
                        })
                    }
                </div>
                <div className="ChatInputArea">
                    <div className="messageInputWrapper">
                        <textarea className="messageTypingSpot" type="text" autoFocus={true} onKeyUp={(e) => {
                            if (e.key === 'Enter') {                               
                                socket.emit('send', { room, message: e.target.value, date:new Date(), name});
                                e.target.value = '';
                            }
                        }} ></textarea>
                     
                    </div></div>

            </div>
        </div >








    )
}





export default ChatBox;