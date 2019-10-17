import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './LinkWindow.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { defaultCipherList } from 'constants';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { useStateValue } from './upState';
import InfoIcon from './InfoIcon'


function LinkWindow(props) {
    const [tokenValue, settokenValue] = useState("");
    const [userName, setuserName] = useState("");
    const [upstateUserName, dispatchupstateUserName] = useStateValue();



    sessionStorage.setItem("name",  userName );

    return (
        <div className="LinkWindow">
            
            <div className="minorLinkWindowWrapper">
                
                <form onSubmit={nameToken}>
                    
                    <div>Type your nick name</div><div className="InfoIconWrapper"><InfoIcon/></div>
                    <input type="text" required value={userName} onChange={e => setuserName(e.target.value)}>
                    </input>
                    <div>Please enter your token here</div>
                    <input type="text" value={tokenValue} onChange={e => settokenValue(e.target.value)}>
                    </input>
                    <input onClick={fetchLink} type="button" value="Generate"></input>
                    <input type="submit" value="Submit"></input></form>
                <Link to={"/"} className='getToMain'>Get Back</Link>





            </div>
            
        </div>

    )
    function fetchLink() {
        var createRoomId = "Id"
        fetch('http://localhost:3001/createRoomId', {
            method: 'POST',
            body: JSON.stringify({ createRoomId }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                console.log(JSON.stringify(response))
                settokenValue(response.roomId);
            })
            .catch(error => console.error('Error:', error));


    }
    function nameToken(e) {
        e.preventDefault()
        fetch('http://localhost:3001/generateRoomId', {
            method: 'POST',
            body: JSON.stringify({ userName, tokenValue }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                console.log(response)
                console.log(tokenValue)
                if (response.success) {
                    dispatchupstateUserName({
                        type: 'passName',
                        payload: { userName }  //payload
                    })
                    props.history.push(`/rooms/${tokenValue}`)
                }
            })
            .catch(error => console.error('Error:', error));

    }
}


export default LinkWindow;