import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { Socket } from "socket.io-client";
import { IRoom } from "../interfaces";

interface Props {
    socket: Socket
}

type GameParams = {
    code: string
}

export const Game: React.FC<Props> = ({socket}) => {
    const { code } = useParams<GameParams>();
    const [roomInfo, setRoomInfo] = useState<undefined | IRoom>();
    const [idx, setIdx] = useState(2);
    const history = useHistory();

    useEffect(() => {
        socket.emit("joinLink", code);
        socket.on("failedJoin", () => {
            console.log("Failed To Join")
            history.push("/");
        })
        socket.on("roomInfo", (room) => {
            setRoomInfo(room)
            setIdx(room.players[0].id === socket.id ? 0:1);
        })
    }, [])

    if (!roomInfo) return <h1>Connecting...</h1>

    return(
        <div>
            <h1>You Joined Room:{roomInfo.code}</h1>
            <h1>You're Player {idx+1}</h1>
        </div>
    )
}