import { getSearchPerson } from "../../data-access/apiAccess";
import { SearchPersonDTO } from "../../data-access/searchPersonDTO";
import { useSearchPersonFetch } from "../Hooks/useSearchPersonFetch";
import { SearchPersonType } from "../Types/SearchPersonTypes";

export async function fetchPersonSearch(
  page: number,
  query: string,
  searchSelect: number,
): Promise<SearchPersonType[]> {
  try {
    const personSearchResponse = await getSearchPerson(page, query);
    let people: SearchPersonDTO[] = [];
    const filteredPeople = personSearchResponse.filter(
      (person: SearchPersonDTO) =>
        person.known_for_department === "Acting" ||
        person.known_for_department === "Directing",
    );
    const sortedPeople = filteredPeople.sort(
      (a: SearchPersonDTO, b: SearchPersonDTO) => b.popularity - a.popularity,
    );

    if (searchSelect === 0) {
      people = sortedPeople.slice(0, 5);
    } else if (searchSelect === 2) {
      people = sortedPeople;
    } else if (
      personSearchResponse == null ||
      personSearchResponse.length == 0
    ) {
      people = [];
    }

    const personSearch: SearchPersonType[] = people?.map(
      (person: SearchPersonDTO) => {
        return {
          personID: person.id,
          personName: person.name,
          personJob: person.known_for_department,
          profilePath: person.profile_path,
        };
      },
    );

    return personSearch;
  } catch (error) {
    console.error("Error fetching and processing trending movies:", error);
    throw error;
  }
}
export function useSearchPerson(
  page: number,
  query: string,
  searchSelect: number,
) {
  return useSearchPersonFetch<SearchPersonType[]>(
    () => fetchPersonSearch(page, query, searchSelect),
    query,
    page,
    searchSelect,
  );
}
