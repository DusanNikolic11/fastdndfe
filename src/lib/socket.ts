import { io } from "socket.io-client";

import { BACKEND_URL, IRoomData } from "./api";

export const socketIO = io(BACKEND_URL);

export interface ISocketEvent {
  event:
    | "PLAYER_JOINED_ROOM"
    | "PLAYER_EDIT"
    | "REQUEST_SENT_TO_DM"
    | "GAME_STARTED"
    | "ROUND_STORY"
    | "GAME_ENDED";
  data: IRoomData;
}
