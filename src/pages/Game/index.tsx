import "swiper/css";
import "swiper/css/pagination";

import React, { useEffect } from "react";
import { ImArrowLeft2, ImArrowRight2 } from "react-icons/im";

import useMediaQuery from "@/hooks/useMediaQuery";
import { cn } from "@/utils/styleUtils";

import Carousel from "./components/Carousel";
import Moves from "./components/Moves";
import PlayerInfo from "./components/PlayerInfo";
import TeamInfo from "./components/TeamInfo";
import useGameSocket from "./hooks/useGameSocket";

const Game = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [storyActions, setStoryActions] = React.useState<"story" | "actions">("story");

  const { roomInfo, canPlay, setCanPlay } = useGameSocket();

  const autoBottomScrollDiv = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (autoBottomScrollDiv.current) {
      autoBottomScrollDiv.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [roomInfo.chatGptResponses]);

  return (
    <div className="flex items-center justify-center h-[90vh] mx-10 my-10 gap-10">
      <div
        className={cn(
          "flex flex-col gap-5 h-full w-full md:w-1/2",
          isMobile && storyActions === "actions" && "hidden",
        )}
      >
        <div className="flex flex-col bg-beige-light/60 rounded-2xl p-2 md:p-5">
          <p className="text-2xl md:text-4xl text-center md:mb-4">Dungeons of Mordor</p>
          <p className="text-2xl md:text-3xl text-center">Level {roomInfo.currentRound + 1}</p>
        </div>

        <div className="bg-beige-light/60 flex flex-col basis-1/2 flex-1 rounded-2xl px-5 py-5 md:py-10 overflow-y-auto overflow-x-hidden">
          {roomInfo.chatGptResponses.map((story) => (
            <p key={story} className="text-md md:text-xl whitespace-pre-line">
              {story} <br /> <br /> <br />
            </p>
          ))}
          <div ref={autoBottomScrollDiv} />
        </div>

        {isMobile ? (
          <div className="flex flex-col gap-4">
            <div className="bg-beige-light/60 rounded-2xl p-2">
              <PlayerInfo roomInfo={roomInfo} />
            </div>
            <div className="bg-beige-light/60 rounded-2xl p-2 mb-4">
              <TeamInfo players={roomInfo.playerState} />
            </div>
            <div
              className="absolute right-2 bottom-2 text-white flex gap-2 justify-center items-center cursor-pointer"
              onClick={() => setStoryActions("actions")}
            >
              ACTIONS <ImArrowRight2 />
            </div>
          </div>
        ) : (
          <>
            {roomInfo.generatedImages.findIndex((image) => image.length === 0) === -1 && (
              <Carousel images={roomInfo.generatedImages} />
            )}
          </>
        )}
      </div>

      <div
        className={cn(
          "md:block bg-beige-light h-full w-full md:w-1/2 p-5 md:p-10",
          isMobile && storyActions === "story" && "hidden",
        )}
      >
        <div className="border-2 border-beige-dark flex flex-col justify-start h-full rounded-2xl p-5">
          <div>
            <p className="text-xl md:text-4xl">TEAM</p>
            <TeamInfo players={roomInfo.playerState} />

            <div className="w-full h-[1px] bg-beige-dark mt-5 mb-3" />

            <PlayerInfo roomInfo={roomInfo} />

            <div className="w-full h-[1px] bg-beige-dark mt-3 mb-5" />

            <Moves roomInfo={roomInfo} canPlay={canPlay} setCanPlay={setCanPlay} />
          </div>
        </div>
        {isMobile && (
          <div
            className="absolute left-2 bottom-1 text-white flex gap-2 justify-center items-center cursor-pointer"
            onClick={() => setStoryActions("story")}
          >
            <ImArrowLeft2 /> STORY
          </div>
        )}
      </div>
    </div>
  );
};

export default Game;
