import BackButton from "@/utils/BackButton";
import StarWeaveTitle from "../../utils/Title";
import SearchBar from "@/utils/SearchBar";

type DatabaseHomePageProps = {
  searchQuery: string
}

export default function DatabaseHomePage({searchQuery, } : DatabaseHomePageProps) {
  return (
    <div className="bg-nebulaBG w-full h-screen">
      <div className="flex flex-col items-center">
        <BackButton destination="/"/>
        <StarWeaveTitle size={7} />
        <p className="text-white font-syne text-[1.8vw]">
          Search Query: "{searchQuery}"
        </p>
        <SearchBar searchDefaultValue={searchQuery}/>
      </div>
    </div>
  );
}