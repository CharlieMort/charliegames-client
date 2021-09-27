import React from 'react';
import './App.css';
import socketIO from "socket.io-client";

const ENDPOINT = "http://localhost:5000";
const socket = socketIO(ENDPOINT);

function App() {
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
