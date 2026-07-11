import BackButton from "@/utils/BackButton";
import { stellarObjectResultType } from "@/types/SearchDataAPI";

export default function IndividualObject({name, location} : stellarObjectResultType) {
  return (
    <div className="h-screen bg-nebulaBG">
      <BackButton destination="/database"/>
      {name}
      {location}
    </div>
  );
}