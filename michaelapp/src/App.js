import React from 'react';
import logo from './logo.svg';
import './App.css';
import Logo from './Logo';
import NavBar from './NavBar';
import Result from './Result';
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";

function Map() {
  return (
    <GoogleMap
      defaultZoom={20}
      defaultCenter={{ lat: 32.087314, lng: 34.804094 }}
    />
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

export default function App() {
  return (
    <div>
      <Logo />
      {/* <Result /> */}
      <div style={{ width: "100vw", height: "100vh" }}>
        <WrappedMap googleMapURL={"https://maps.googleapis.com/maps/api/js?key=AIzaSyBuF65jbesGB7LTrp7hlmLVKzPhuYlB62o&v=3.exp&libraries=geometry,drawing,places"}
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `400px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        /></div>
      <NavBar />
    </div>
  );
}


