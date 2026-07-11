import { stellarObjectResultType } from "@/types/SearchDataAPI";

export default function DatabaseObjectCard({name, location} : stellarObjectResultType) {
  return (
    <div className="flex flex-col w-[20vw] h-[20vw] aspect-square">
      <p className="general-text"> {name} </p>
      <p className="general-text"> {location} </p>
    </div>
  );
}