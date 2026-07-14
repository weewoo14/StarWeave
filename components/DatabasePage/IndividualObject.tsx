import BackButton from "@/utils/BackButton";
import StarWeaveTitle from "@/utils/Title";

type IndividualObjectProps = {
  name: string;
  location: string;
  fromQuery: string;
};

const stellarObjectCategory: Record<string, string> = {
  horizons: "Horizon Major Body",
  exoplanet: "Exoplanet",
};

export default function IndividualObject({ name, location, fromQuery }: IndividualObjectProps) {
  return (
    <div className="flex flex-col items-center min-h-screen bg-nebulaBG">
      <BackButton destination={`/database?query=${fromQuery}`} />
      <StarWeaveTitle size={5} />
      <p className="general-text">{name}</p>
      <p className="general-text">{stellarObjectCategory[location]}</p>
    </div>
  );
}
