import BackButton from "@/components/Helper/BackButton";
import SearchBar from "@/components/Helper/SearchBar";
import StarWeaveTitle from "@/components/Helper/Title";
import { filterSearchResult } from "@/utils/SearchResultFilter";

import { useStarWeaveState } from "../StarWeaveContext";

import DatabaseObjectCard from "./DatabaseObjectCard";

type DatabaseHomePageProps = {
  searchQuery: string;
};

export default function DatabaseHomePage({ searchQuery }: DatabaseHomePageProps) {
  const { searchData } = useStarWeaveState();
  const databaseSearchResults = filterSearchResult(searchData, searchQuery, 100);

  return (
    <div className="bg-nebulaBG w-full min-h-screen h-auto">
      <div className="flex flex-col items-center">
        <BackButton destination="/" />
        <StarWeaveTitle size={7} />
        <p className="text-white font-syne text-[1.8vw]">Search Query: &quot;{searchQuery}&quot;</p>
        <SearchBar searchDefaultValue={searchQuery} searchAmount={10} />
      </div>

      <div className="flex flex-wrap justify-center">
        {databaseSearchResults.map((DatabaseObject, idx) => {
          return (
            <DatabaseObjectCard
              key={idx}
              objectID={DatabaseObject.id}
              name={DatabaseObject.name}
              location={DatabaseObject.location}
              searchQuery={searchQuery}
            />
          );
        })}
      </div>
    </div>
  );
}
