import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './LinkWindow.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { defaultCipherList } from 'constants';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

function LinkWindow(props) {
    const [tokenValue, settokenValue] = useState("");
    const [userName, setuserName] = useState("");
    const [passToken, setpassToken] = useState("");
    
    return (
        <div className="LinkWindow">
            <div className="minorLinkWindowWrapper">
                <form onSubmit={nameToken}>
                    <div><input type="text" required value={userName} onChange={e => setuserName(e.target.value)}>
                    </input> &larr;Type your nick name</div>
                    <div><input type="text" value={passToken} onChange={e => setpassToken(e.target.value)}>
                    </input> &larr;Please enter your token here</div><input  type="submit" value="Submit"></input></form>
                <form>
                    <div><input type="text" value={tokenValue} readOnly>
                    </input> &larr;Press here to generate token</div><input onClick={fetchLink} type="button" value="Generate"></input></form>
                <Link to={"/"} className='getToMain'>Get Back</Link>





            </div>
        </div>

    )
    function fetchLink() {
        var createRoomId = "Id"
        fetch('http://localhost:3001/kaki', {
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
    function nameToken(e){
        e.preventDefault()
        fetch('http://localhost:3001/pipi', {
            method: 'POST',
            body: JSON.stringify({ userName,passToken }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(response => {
                console.log(response)
                if (response.success) {
                      props.history.push('/ChatBox');
                }
            })
            .catch(error => console.error('Error:', error));

    }
}


export default LinkWindow;