import { FaBinoculars, FaHatWizard } from "react-icons/fa";
import { GiBroadsword } from "react-icons/gi";

const JobIcon = ({ job }: { job: string }) => {
  switch (job) {
    case "Warrior":
      return <GiBroadsword className="w-5 h-5 md:w-10 md:h-10" />;
    case "Mage":
      return <FaHatWizard className="w-5 h-5 md:w-10 md:h-10" />;
    case "Explorer":
      return <FaBinoculars className="w-5 h-5 md:w-10 md:h-10" />;
    default:
      return <GiBroadsword className="w-5 h-5 md:w-10 md:h-10" />;
  }
};

export default JobIcon;
