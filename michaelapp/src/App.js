import React from 'react';
import logo from './logo.svg';
import './App.css';
import Logo from './Logo';
import NavBar from './NavBar';
import Result from './Result';

class App extends React.Component {
  render() {
    return (
      <div>
        <Logo/>
        <NavBar/>
        <Result/>
      </div>
    );
  }
}

export default App;
