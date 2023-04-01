import { useState } from "react";

import DnDButton from "@/components/DnDButton";
import JobIcon from "@/components/JobIcon";
import Selectbox from "@/components/Selectbox";
import api from "@/lib/api";

import useLobbySocket from "./hooks/useLobbySocket";

const jobs = [{ label: "Warrior" }, { label: "Mage" }, { label: "Explorer" }];

const Lobby = () => {
  const { conversationId, link, currentPlayer, isGameStarting, players } = useLobbySocket();

  const [champion, setChampion] = useState(jobs[0]);
  const [name, setName] = useState("");

  const updatePlayer = () => {
    api.editPlayer({
      conversationId,
      playerId: currentPlayer.id,
      updateParams: { name, champion: champion.label },
    });
  };

  const startGame = () => {
    api.startGame({ conversationId });
  };

  return (
    <div className="flex items-center justify-center h-[90vh] mx-10 my-10">
      <div className="md:flex-1" />
      <div className="flex-1 bg-beige-light h-full max-w-full p-10">
        <div className="border-2 border-beige-dark items-start flex flex-col justify-start h-full rounded-2xl">
          {players.map((player) => (
            <div key={player.id} className="mt-4 w-full">
              <div className="mx-5 md:mx-20 flex justify-start items-center gap-4">
                <JobIcon job={player.champion} />
                <p className="text-xl md:text-4xl text-center">{player.name}</p>
              </div>
              <div className="mx-5 md:mx-10 max-w-full w-11/12 h-[1px] bg-beige-dark mt-4" />
            </div>
          ))}

          <div className="mt-5 md:mt-20 w-full flex items-center justify-center">
            <DnDButton onClick={startGame} disabled={isGameStarting}>
              Begin
            </DnDButton>
          </div>

          <div className="px-10 mt-10 md:mt-20 w-full flex flex-col md:flex-row justify-between gap-10">
            <input
              type="text"
              className="p-2 flex-1 text-xl text-brown focus:outline-brown"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Selectbox options={jobs} selected={champion} onChange={setChampion} />
          </div>
          <div className="w-full flex justify-center items-center mt-5">
            <DnDButton onClick={updatePlayer} disabled={isGameStarting}>
              Update
            </DnDButton>
          </div>

          <p className="w-full text-center text-3xl mt-5 md:mt-10">
            Room ID: <span className="text-brown">{link}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Lobby;
