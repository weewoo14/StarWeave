import BackButton from "@/utils/BackButton";

type IndividualObjectProps = {
  name: string;
  location: string;
  fromQuery: string;
};

export default function IndividualObject({ name, location, fromQuery }: IndividualObjectProps) {
  return (
    <div className="h-screen bg-nebulaBG">
      <BackButton destination={`/database?query=${fromQuery}`} />
      {name}
      {location}
    </div>
  );
}
