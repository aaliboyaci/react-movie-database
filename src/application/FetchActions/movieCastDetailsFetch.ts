import { getMovieCastDetails } from "../../data-access/apiAccess";
import { useFetch } from "../Hooks/useFetchV2";
import {
  CrewMember,
  CastMember,
  MovieCastDetails,
} from "../Types/MovieCastDetailsTypes";

export async function fetchMovieCastDetails(
  showId: string | undefined,
): Promise<MovieCastDetails> {
  try {
    const movieCastDetailsResponse = await getMovieCastDetails(showId);
    const director: CrewMember | undefined =
      movieCastDetailsResponse.crew?.find(
        (person: CrewMember) =>
          person.job === "Director" && person.department === "Directing",
      );

    const mainCast: CastMember[] | undefined =
      movieCastDetailsResponse.cast?.slice(0, 3);

    const movieCastDetails: MovieCastDetails = {
      directorID: director?.id,
      directorName: director?.name,
      mainCast: mainCast,
    };

    return movieCastDetails;
  } catch (error) {
    console.error("Error fetching and processing movie cast details:", error);
    throw error;
  }
}

export function useMovieCastDetailsFetch(showId: string | undefined) {
  return useFetch<MovieCastDetails>(() => fetchMovieCastDetails(showId));
}
