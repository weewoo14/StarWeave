import BackButton from "@/utils/BackButton";
import StarWeaveTitle from "../../utils/Title";
import SearchBar from "@/utils/SearchBar";
import DatabaseObjectCard from "./DatabaseObjectCard";
import { filterSearchResult } from "@/utils/SearchResultFilter";
import { useStarWeaveState } from "../StarWeaveContext";

type DatabaseHomePageProps = {
  searchQuery: string
}

export default function DatabaseHomePage({searchQuery, } : DatabaseHomePageProps) {
  const {searchData} = useStarWeaveState();
  const databaseSearchResults = filterSearchResult(searchData, searchQuery, 100);

  return (
    <div className="bg-nebulaBG w-full h-screen">
      <div className="flex flex-col items-center">
        <BackButton destination="/"/>
        <StarWeaveTitle size={7} />
        <p className="text-white font-syne text-[1.8vw]">
          Search Query: "{searchQuery}"
        </p>
        <SearchBar searchDefaultValue={searchQuery} searchAmount={10}/>
      </div>

      <div className="flex flex-wrap">
        {databaseSearchResults.map((DatabaseObject, idx) => {
          return (
            <DatabaseObjectCard key={idx} name={DatabaseObject.name} location={DatabaseObject.location}/>
          );
        })}
      </div>
    </div>
  );
}