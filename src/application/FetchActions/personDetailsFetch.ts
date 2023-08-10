import {
  getMovieDetails,
  getPersonDetails,
  getPersonPopMovies,
} from "../../data-access/apiAccess";
import { MovieDetailsDTO } from "../../data-access/movieDetailsDTO";
import { useFetch } from "../Hooks/useFetchV2";
import { MovieDetails } from "../Types/MovieDetailsTypes";
import { PersonDetailsTypes } from "../Types/PersonDetailsTypes";
import { PersonPopMoviesTypes } from "../Types/PersonPopMoviesTypes";

export async function fetchPersonDetails(
  personID: string | undefined,
): Promise<{
  personDetails: PersonDetailsTypes;
  popMovies: PersonPopMoviesTypes[];
}> {
  try {
    const personDetailsResponse = await getPersonDetails(personID);
    const personDetails: PersonDetailsTypes = {
      id: personDetailsResponse.id,
      name: personDetailsResponse.name,
      profilPath: personDetailsResponse.profile_path,
      knownFor: personDetailsResponse.known_for,
      knownForDepartment: personDetailsResponse.known_for_department,
      biography: personDetailsResponse.biography,
      birthday: personDetailsResponse.birthday,
      placeOfBirth: personDetailsResponse.place_of_birth,
      gender: personDetailsResponse.gender,
      website: personDetailsResponse?.homepage,
    };

    const personPopMoviesResponse = await getPersonPopMovies(personID);
    const cast: PersonPopMoviesTypes[] | undefined =
      personPopMoviesResponse.cast;
    const crew: PersonPopMoviesTypes[] | undefined =
      personPopMoviesResponse.crew;
    let popMovies: PersonPopMoviesTypes[] | undefined = [];
    console.log("bu kişi=" + personDetailsResponse.known_for);
    ///

    if (personDetails.knownForDepartment === "Acting") {
      const filteredCast = cast?.filter(
        (item: any) => !item.character.includes("(voice)"),
      );
      const sortedCast = filteredCast?.sort(
        (a: any, b: any) => b.popularity - a.popularity,
      );
      const top5Films = sortedCast?.slice(0, 5);
      popMovies = top5Films || [];
      console.log(popMovies);
    }
    if (personDetails.knownForDepartment === "Directing") {
      const filteredCast = crew?.filter((item: any) =>
        item.department.includes("Directing"),
      );
      const sortedCast = filteredCast?.sort(
        (a: any, b: any) => b.popularity - a.popularity,
      );
      const top5Films = sortedCast?.slice(0, 5);
      popMovies = top5Films || [];
    }

    return { personDetails, popMovies };
  } catch (error) {
    console.error("Error fetching and processing person details:", error);
    throw error;
  }
}

export function usePersonDetailsFetch(personID: string | undefined) {
  return useFetch<{
    personDetails: PersonDetailsTypes;
    popMovies: PersonPopMoviesTypes[];
  }>(() => fetchPersonDetails(personID));
}
