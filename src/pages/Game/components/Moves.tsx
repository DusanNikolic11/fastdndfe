import "swiper/css";
import "swiper/css/pagination";

import React, { useEffect, useState } from "react";

import DnDButton from "@/components/DnDButton";
import api from "@/lib/api";
import { MoveTypes } from "@/types/dnd";
import { cn } from "@/utils/styleUtils";

import { IRoomInfo } from "../hooks/useGameSocket";

interface IMovesProps {
  canPlay: boolean;
  setCanPlay: React.Dispatch<React.SetStateAction<boolean>>;
  roomInfo: IRoomInfo;
}

const Moves = ({ canPlay, setCanPlay, roomInfo }: IMovesProps) => {
  const { currentRound, currentPlayer, conversationId } = roomInfo;
  const isFreeWillMove = currentRound % 2 !== 0;

  useEffect(() => {
    if (isFreeWillMove) setMoveType(MoveTypes.FREE_WILL);
  }, [isFreeWillMove]);

  const [message, setMessage] = useState("");
  const [manaUsed, setManaUsed] = useState(0);
  const [moveType, setMoveType] = useState<MoveTypes>(MoveTypes.FREE_WILL);
  const [selectedMove, setSelectedMove] = useState<number>(-1);
  const [diceRoll, setDiceRoll] = useState<number>(0);

  const onMoveSubmit = () => {
    api
      .playMove({ conversationId, moveType, message, playerId: currentPlayer.id, mana: manaUsed })
      .then((res) => {
        setCanPlay(false);
        setSelectedMove(-1);
        setManaUsed(0);
        setMessage("");
        setDiceRoll(res.data.diceAfterBonus);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center gap-3 md:gap-6">
      <div className="w-full flex flex-col md:flex-row">
        {isFreeWillMove ? (
          <div className="flex flex-col md:flex-row w-full">
            <div className="flex flex-col md:flex-row gap-4 w-full">
              <textarea
                className="border-2 border-beige-dark w-full h-28 p-2 rounded-2xl resize-none focus:outline-none focus:ring focus:ring-beige-dark"
                placeholder="Your move..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <div className="flex flex-row md:flex-col gap-2">
                {Array.from({ length: 3 }, (_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "text-sm text-center md:text-left py-1 px-3 border-2 border-beige-dark w-full cursor-pointer hover:bg-beige-dark transition-all duration-300 capitalize whitespace-nowrap",
                      manaUsed === i && "bg-beige-dark",
                      i > currentPlayer.mana && "opacity-50 pointer-events-none",
                    )}
                    onClick={() => {
                      setManaUsed(i);
                    }}
                  >
                    + {i}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 w-full md:w-1/2">
            {Object.values(MoveTypes)
              .filter((value) => value !== MoveTypes.FREE_WILL)
              .map((moveType, i) => (
                <div
                  key={i}
                  className={cn(
                    "text-sm text-center md:text-left py-1 px-3 border-2 border-beige-dark w-full cursor-pointer hover:bg-beige-dark transition-all duration-300 capitalize",
                    selectedMove === i && "bg-beige-dark",
                  )}
                  onClick={() => {
                    setManaUsed(0);
                    setMoveType(moveType);
                    setSelectedMove(i);
                  }}
                >
                  {moveType.split("_").join(" ")}
                </div>
              ))}
          </div>
        )}
        <div className="flex items-center mt-4 md:mt-0 justify-center w-full md:w-1/2">
          <div className="border-2 border-beige-dark w-10 h-10 md:w-20 md:h-20 flex items-center justify-center text-sm md:text-4xl">
            {diceRoll}
          </div>
        </div>
      </div>
      <DnDButton disabled={!canPlay} onClick={onMoveSubmit}>
        Submit
      </DnDButton>
    </div>
  );
};

export default Moves;
