import axios from "axios";
import { toast } from "react-toastify";

import { IPlayer, IRoom } from "@/types/dnd";

export const BACKEND_URL = "http://api-dev.fastdnd.net/";

const api = axios.create({
  baseURL: BACKEND_URL + "v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data && error.response.data.message) {
      toast.error(error.response.data.message);
    }
    // return Promise.reject(error);
  },
);

const createRoom = async (data: { generateImages: boolean }) => {
  return await api.post<IRoom>("room", data);
};

const joinRoom = async (data: { link: string }) => {
  return await api.post<IRoom>("room/join", data);
};

export interface IRoomData {
  state: string;
  moves: string[];
  playerState: IPlayer[];
  roundEndsAt: string | null;
  link: string;
  queuedMoves: string[];
  currentRound: number;
  chatGptResponses: string[];
  generatedImages: string[];
}

const getRoomData = async (conversationId: string) => {
  return await api.get<IRoomData>(`room/${conversationId}/`);
};

const startGame = async (data: { conversationId: string }) => {
  return await api.post("room/start", data);
};

interface IEditPlayer {
  conversationId: string;
  playerId: string;
  updateParams: {
    name: string;
    champion: string;
  };
}

const editPlayer = async (data: IEditPlayer) => {
  return await api.put("player/edit", data);
};

interface IPlayMove {
  conversationId: string;
  playerId: string;
  mana: number;
  moveType: string;
  message?: string;
}

interface IPlayMoveResponse {
  dice: number;
  diceAfterBonus: number;
}

const playMove = async (data: IPlayMove) => {
  return await api.post<IPlayMoveResponse>("play", data);
};

export default {
  createRoom,
  joinRoom,
  getRoomData,
  startGame,
  editPlayer,
  playMove,
};
