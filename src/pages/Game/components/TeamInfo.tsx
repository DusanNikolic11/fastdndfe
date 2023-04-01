import JobIcon from "@/components/JobIcon";
import { IPlayer } from "@/types/dnd";

const TeamInfo = ({ players }: { players: IPlayer[] }) => {
  return (
    <div className="grid grid-cols-2 gap-5 mt-4">
      {players.map((player) => (
        <div key={player.id} className="w-full">
          <div className="flex justify-start items-center gap-2 md:gap-4">
            <JobIcon job={player.champion} />
            <p className="text-sm md:text-xl text-center whitespace-nowrap">
              {player.name} {player.health} HP
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TeamInfo;
