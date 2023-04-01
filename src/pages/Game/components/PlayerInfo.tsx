import dayjs from "dayjs";
import { useEffect, useState } from "react";

import { IRoomInfo } from "../hooks/useGameSocket";

const PlayerInfo = ({ roomInfo }: { roomInfo: IRoomInfo }) => {
  const { roundEndsAt, currentPlayer, currentRound } = roomInfo;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMinutes(Math.max(Math.floor(dayjs(roundEndsAt).diff(dayjs()) / 1000 / 60), 0));
      setSeconds(Math.max(Math.floor(dayjs(roundEndsAt).diff(dayjs()) / 1000) % 60, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [roundEndsAt]);

  const timeLeft = `${minutes}m${Math.abs(seconds) < 10 ? "0" : ""}${Math.abs(seconds)}s`;

  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-xl md:text-3xl">
        TURN {currentRound + 1} &nbsp;&nbsp;&nbsp; {roundEndsAt === null ? "GAME OVER" : timeLeft}
      </p>
      <div className="flex flex-row justify-center items-center gap-4 text-sm md:text-lg whitespace-nowrap">
        <p>{currentPlayer.name}</p>
        <p>HP: {currentPlayer.health}</p>
        <p>Bonus: {currentPlayer.bonusForNextRound}</p>
        <p>Mana: {currentPlayer.mana}</p>
      </div>
    </div>
  );
};

export default PlayerInfo;
