import React, { useEffect, useState } from 'react';
import './App.css';
import socketIO from "socket.io-client";
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import { Home } from "./components/Home";
import { Game } from './components/Game';

const ENDPOINT = "http://localhost:5000";
const socket = socketIO(ENDPOINT);

interface RoomSchema {
  code: number,
  players: [{
    id: string,
  }]
}

function App() {
  const [roomInfo, setRoomInfo] = useState<undefined | RoomSchema>(undefined);
  const [code, setCode] = useState<undefined | string>(undefined);

  useEffect(() => {
    socket.on("roomInfo", (data) => {
      setRoomInfo(data);
    })
    socket.on("privateLobby", (code) => {
      setCode(code);
    })
    socket.on("testserver", () => {
      console.log("test from server");
    })
  }, [])

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Home socket={socket} />
          </Route>
          <Route path="/private" exact>
              {
                code
                  ? roomInfo
                    ? <Redirect to={`/game/${roomInfo.code}`} />
                    : <div>
                        <h1>You're In A Private Lobby</h1>
                        <h2>Send This Link For Someone To Join</h2>
                        <h2>localhost:3000/game/{code}</h2>
                      </div>
                : <Redirect to="/" />
              }
          </Route>
          <Route path="/game/:code?">
            <Game socket={socket} />
          </Route>
          <Route path="/queue">
            {
              roomInfo
              ? <Redirect to={`/game/${roomInfo.code}`} />
              : <div>
                <h1>You're Queueing For A Game</h1>
              </div>
            }
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
