import ReactDOM from 'react-dom';
import './ChatBox.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { defaultCipherList } from 'constants';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { animateScroll as scroll } from "react-scroll";

const socket = socketIOClient('http://localhost:4000');
let tempSocketMessages = [];
console.log(tempSocketMessages)
let counter = 0;

function ChatBox(e,props) {
    const [newMsgs, setNewMsgs] = useState(0)
    const [messages, setMessages] = useState([]);
    const containerRef = useRef(null);

    useEffect((e) => {
        socket.on('chat message', newMessage => {


            // tempSocketMessages.push(newMsgs)
            tempSocketMessages.push(newMessage)

            setNewMsgs(counter + 1);
            counter++;

        })

        fetch("http://localhost:4000/messages")
            .then(response => {
                return response.json();
            })
            .then(data => {
                let newOrder = data.messages.reverse();
                setMessages(data.messages);
            });

        console.log('use effect init')
    }, []);

    useEffect(() => {

        scroll.scrollToBottom()

    })


    return (
        <div className="gridWrapper">
            <div className="original-grid-container">
                <div className="NickNamesArea"></div>
                <div className="ChatArea">
                    {
                        messages.map((message, index) => {

                            return <p key={index}>{message.message}</p>
                        })
                    }
                    {
                        tempSocketMessages.map((message, index) => {

                            return <p key={index + 'socket'}>{message.message}</p>
                        })
                    }
                </div>
                <div className="ChatInputArea">
                    <div className="messageInputWrapper">
                        <input className="messageTypingSpot" type="text" className='inputText' autoFocus={true} onKeyUp={(e) => {
                            if (e.key === 'Enter') {
                                socket.emit("chat message", e.target.value);
                                e.target.value = ''; 
                            }
                        }} />
                    {/* <input className="ChatInputButton" type="submit" value="Enter"></input> */}
                    </div></div>

        </div>
        </div >








    )
}





export default ChatBox;