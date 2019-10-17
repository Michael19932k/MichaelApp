import ReactDOM from 'react-dom';
import './ChatBox.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { defaultCipherList } from 'constants';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import io from 'socket.io-client'
import { animateScroll as scroll } from "react-scroll"
import { useStateValue } from './upState';

var socket = io('localhost:4000', { transports: ['websocket'], upgrade: false });
let tempSocketMessages = [];

let counter = 0;
let namesTemp = [];


function ChatBox({ match }, e, props) {
    const [context,] = useStateValue();
    const [name, setName] = useState(sessionStorage.getItem('name'))
    
    // ```````````````````````````````````````````````````````````
    const [newMsgs, setNewMsgs] = useState(0);
    const [messages, setMessages] = useState([]);
    const [names, setNames] = useState([]);

    const containerRef = useRef(null);
    let room = match.params.id

    useEffect(() => {

        // if (name === undefined || null) {
        //     let storageName = localStorage.getItem('name')
        //     setName(storageName)
        // } 

        console.log('check name', name)


        fetch(`http://localhost:3001/messages/${room}`, {
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
            tempSocketMessages.push(data)
            setNewMsgs(counter + 1);
            counter++;
        });

        socket.on('name', namesArray => {
            if (namesArray) {
                namesTemp = namesArray;
                setNames(counter + 1);
                counter++;
            }
        })
        socket.on('updateusers', filteredItems => {
            if (filteredItems) {
                let x = filteredItems
                console.log(x)
                namesTemp = x;
                if (filteredItems) {
                    setNames(counter + 1);
                    counter++;
                }
            }
        })


        socket.emit('subscribe', room);
        socket.emit('name', { name, room });

    }, []);

    useEffect(() => {
        const chatHeight = containerRef.current.getBoundingClientRect().height;
        containerRef.current.scrollTop = containerRef.current.scrollHeight;
    })


    return (
        <div className="gridWrapper">
            <div className="original-grid-container">
                <div className="NickNamesArea">
                    Chat mates:
                    {
                        namesTemp.map((name2, index) => {
                            return (
                                <p key={index}>{name2}</p>
                            )
                        })
                    }

                </div>
                <div className="ChatArea" ref={containerRef}>
                    {
                        messages.map((message, index) => {


                            return <div className="messageBubble" key={index}><div className="userName">{message.name}</div><div className="messageDate">{message.date.toString().slice(11, -8)}</div>{<br />}{message.message}</div>
                        })
                    }
                    {
                        tempSocketMessages.map((data, index) => {
                            return <div className="messageBubble" key={index + 'socket'}><div className="userName">{data.name}</div><div className="messageDate">{data.date.toString().slice(11, -8)}</div>{<br />}{data.message}</div>
                        })
                    }
                </div>
                <div className="ChatInputArea">
                    <div className="messageInputWrapper">
                        <textarea className="messageTypingSpot" placeholder="Press to type..." type="text" autoFocus={true} onKeyUp={(e) => {
                            if (e.key === 'Enter') {

                                if (e.target.value.length > 1) {
                                    socket.emit('sendMessage', { room, message: e.target.value, date: new Date(), name });
                                }
                                e.target.value = '';

                            }
                        }} ></textarea>

                    </div></div>

            </div>
        </div >








    )
}



export default ChatBox;