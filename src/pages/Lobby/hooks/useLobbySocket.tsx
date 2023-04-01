import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import api from "@/lib/api";
import { ISocketEvent, socketIO } from "@/lib/socket";
import { IPlayer, IRoom } from "@/types/dnd";

const useLobbySocket = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { conversationId, link, admin, player } = location.state as IRoom;

  const [socketConnected, setSocketConnected] = useState(socketIO.connected);
  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState((admin ?? player) as IPlayer);
  const [isGameStarting, setIsGameStarting] = useState(false);

  useEffect(() => {
    const getInitialPlayers = () =>
      api.getRoomData(conversationId).then((res) => {
        setPlayers(res.data.playerState);
        const player = res.data.playerState.find((p) => p.id === currentPlayer.id) as IPlayer;
        setCurrentPlayer(player);
      });

    if (players.length === 0) getInitialPlayers();

    const onEvent = (event: ISocketEvent) => {
      if (event.event === "PLAYER_JOINED_ROOM") setPlayers(event.data.playerState);
      if (event.event === "PLAYER_EDIT") {
        setPlayers(event.data.playerState);
        const player = event.data.playerState.find((p) => p.id === currentPlayer.id) as IPlayer;
        setCurrentPlayer(player);
      }
      if (event.event === "REQUEST_SENT_TO_DM") {
        setIsGameStarting(true);
      }
      if (event.event === "GAME_STARTED") {
        navigate(`/game/${conversationId}`, {
          state: { ...event.data, conversationId, currentPlayer },
        });
      }
    };

    socketIO.on("connect", () => setSocketConnected(true));
    socketIO.on("disconnect", () => setSocketConnected(false));
    socketIO.on(conversationId, onEvent);

    return () => {
      socketIO.off("connect", () => setSocketConnected(true));
      socketIO.off("disconnect", () => setSocketConnected(false));
      socketIO.off(conversationId, onEvent);
    };
  }, [players, currentPlayer, conversationId, navigate]);

  return { socketConnected, conversationId, link, players, currentPlayer, isGameStarting };
};

export default useLobbySocket;
