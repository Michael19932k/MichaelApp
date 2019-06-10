import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './LinkWindow.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { defaultCipherList } from 'constants';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

function LinkWindow() {
    const [tokenValue, settokenValue] = useState("");
    const [userName, setuserName] = useState("");
    return (
        <div className="LinkWindow">
            <div className="minorLinkWindowWrapper">
                <form>
                    <div><input type="text" value={userName} onChange={e => setuserName(e.target.value)}>
                    </input> &larr;Type your nick name</div>
                    <div><input type="text" value={tokenValue} readOnly>
                    </input> &larr;Press here to generate token</div><input onClick={fetchLink} type="button" value="Generate"></input></form>
                <form>
                    <div><input type="text">
                    </input> &larr;Please enter your token here</div><Link to={"/ChatBox"}><input type="submit" value="Submit"></input></Link></form>
                <Link to={"/"} className='getToMain'>Get Back</Link>





            </div>
        </div>

    )
    function fetchLink() {
        var loh = "pipi"
        fetch('http://localhost:3001/kaki', {
            method: 'POST',
            body: JSON.stringify({ loh }),
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
}


export default LinkWindow;