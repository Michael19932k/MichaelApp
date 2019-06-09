import React from 'react';
import './App.css';
import BackgroundAnimation from './BackgroundAnimation';
import SignUpBox from './SignUpBox';
import NavButtonMenu from './NavButtonMenu';
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import LinkWindow from './LinkWindow';
import ChatBox from './ChatBox';







export default function App() {
  return (
    <Router>
      <div>
        <BackgroundAnimation />
        {/* <ChatBox /> */}
        <Route exact path="/" component={NavButtonMenu} />
        <Route path="/LinkWindow" component={LinkWindow} />
    </div>
      </Router>
        );
      }
      
      
