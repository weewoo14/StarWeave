import BackButton from "@/utils/BackButton";

type IndividualObjectProps = {
  name: string,
  location: string
}

export default function IndividualObject({name, location} : IndividualObjectProps) {
  return (
    <div className="h-screen bg-nebulaBG">
      <BackButton destination="/database"/>
      {name}
      {location}
    </div>
  );
}