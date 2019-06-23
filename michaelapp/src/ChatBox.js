import ReactDOM from 'react-dom';
import './ChatBox.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { defaultCipherList } from 'constants';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import socketIOClient from "socket.io-client";
import { animateScroll as scroll } from "react-scroll";
import {useStateValue} from './upState';

const io = require("socket.io-client")
const socket = socketIOClient('http://localhost:4000/');
let tempSocketMessages = [];
let tempSocketNames = [];
let counter = 0;


function ChatBox({ match }, e, props) {
    const [context,] = useStateValue();
    const [serviceList, ] = useState(context.setName.userName)
    let name = serviceList
    // ```````````````````````````````````````````````````````````
    const [newMsgs, setNewMsgs] = useState(0);
    const [messages, setMessages] = useState([]);
    const [names, setNames] = useState([]);
    const containerRef = useRef(null);
    let room = match.params.id


    useEffect(() => {
        fetch('http://localhost:4000/messages', {
            method: 'POST',
            body: JSON.stringify({ name }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                let newOrder = response.messages.reverse();
                setMessages(response.messages);
            })
            .catch(error => console.error('Error:', error))    

        
        socket.on('message', function (data) {
            console.log(data);
            tempSocketMessages.push(data)
            setNewMsgs(counter + 1);
            counter++;
            console.log(newMsgs)
        });

        socket.emit('subscribe', room);
        socket.emit('name', name);
        socket.on('name', name=>{
            console.log('name was recived', name)
           setNames([...names, name])
        })
        
    }, []);

    useEffect(() => {

        scroll.scrollToBottom()
    })

    return (
        <div className="gridWrapper">
            <div className="original-grid-container">
                <div className="NickNamesArea">
                    {
                        names.map((name, index)=>{
                            console.log(names)
                            return (
                                <p key={index}>{name}</p>
                            )
                        })
                    }

                </div>
                <div className="ChatArea" ref={containerRef}>
                    {
                        messages.map((message, index) => {


                            return <div className="messageBubble" key={index}><div className="userName">{message.name}</div><div className="messageDate">{message.date.toString().slice(11, -8)}</div>{<br/>}{message.message}</div> 
                        })
                    }
                    {
                        tempSocketMessages.map((data, index) => {
                            console.log(data)
                            return <div className="messageBubble" key={index + 'socket'}><div className="userName">{data.name}</div><div className="messageDate">{data.date.toString().slice(11, -8)}</div>{<br/>}{data.message}</div>
                        })
                    }
                </div>
                <div className="ChatInputArea">
                    <div className="messageInputWrapper">
                        <textarea className="messageTypingSpot" type="text" required autoFocus={true} onKeyUp={(e) => {
                            if (e.key === 'Enter') {                               
                                console.dir(name)
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