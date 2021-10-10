import React, { useState } from "react";
import { Redirect } from "react-router";
import { Socket } from "socket.io-client";

interface Props {
    socket: Socket
}

export const Home: React.FC<Props> = ({socket}) => {
    const [buttonPressed, setButtonPressed] = useState("");

    const FindRandom = () => {
        socket.emit("joinRandom");
        setButtonPressed("random");
    }

    const CreatePrivate = () => {
        socket.emit("createPrivate");
        setButtonPressed("private");
    }

    switch(buttonPressed) {
        case "random":
            return <Redirect to="/queue" />
        case "private":
            return <Redirect to="/private" />
    }

    return(
        <div className="Home">
            <button onClick={FindRandom}>Find Random Game</button>
            <button onClick={CreatePrivate}>Create Private Game</button>
        </div>
    )
}