import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import { IRoomData } from "@/lib/api";
import { ISocketEvent, socketIO } from "@/lib/socket";
import { IPlayer } from "@/types/dnd";

export interface IRoomInfo extends IRoomData {
  conversationId: string;
  currentPlayer: IPlayer;
}

const useGameSocket = () => {
  const location = useLocation();
  const [roomInfo, setRoomInfo] = React.useState<IRoomInfo>(location.state as IRoomInfo);

  const [socketConnected, setSocketConnected] = useState(socketIO.connected);

  const [canPlay, setCanPlay] = useState(true);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    const onEvent = (event: ISocketEvent) => {
      if (event.event === "ROUND_STORY") {
        setRoomInfo({
          ...roomInfo,
          ...event.data,
          currentPlayer: event.data.playerState.find(
            (player) => player.id === roomInfo.currentPlayer.id,
          ) as IPlayer,
        });
        setCanPlay(true);
      }
      if (event.event === "GAME_ENDED") {
        setRoomInfo({
          ...roomInfo,
          ...event.data,
          currentPlayer: event.data.playerState.find(
            (player) => player.id === roomInfo.currentPlayer.id,
          ) as IPlayer,
        });
        setGameEnded(true);
      }
    };

    socketIO.on("connect", () => setSocketConnected(true));
    socketIO.on("disconnect", () => setSocketConnected(false));
    socketIO.on(roomInfo.conversationId, onEvent);

    return () => {
      socketIO.off("connect", () => setSocketConnected(true));
      socketIO.off("disconnect", () => setSocketConnected(false));
      socketIO.off(roomInfo.conversationId, onEvent);
    };
  }, [roomInfo]);

  return { roomInfo, socketConnected, canPlay, setCanPlay, gameEnded };
};

export default useGameSocket;
