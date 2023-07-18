import React, { useEffect, useState } from 'react'
import useFetch from "../Hooks/useFetch";
import { baseUrl, apiKey } from '../Services/tmdbApiServices';
import { popProps } from "../Routes/PersonPage"


export interface PersonDetails {
    id: number;
    name: string;
    profile_path: string;
    known_for: { id: number; title: string; poster_path: string }[];
    known_for_department: string;
    biography: string;
    birthday: string
    place_of_birth: string;
    gender: number;
    homepage: string;

}

const personFetch = (setPersonDetails: React.Dispatch<React.SetStateAction<PersonDetails | null>>, personId: string | undefined,
    setPopMovies: React.Dispatch<React.SetStateAction<popProps | null>>) => {
    const [job, setJob] = useState("");

    const { isLoading: isLoading1, data: data1, error: error1 }: any = useFetch(`${baseUrl}person/${personId}?api_key=${apiKey}`);
    const { isLoading: isLoading2, data: data2, error: error2 }: any = useFetch(`${baseUrl}person/${personId}/movie_credits?api_key=${apiKey}`)


    /*kişi bilgisi için ilk fetch*/
    useEffect(() => {
        if (!isLoading1 && data1 !== null && data1.length !== 0) {
            setPersonDetails(data1);
            if (data1.known_for_department === "Acting") { setJob("Actor") }
            if (data1.known_for_department === "Directing") { setJob("Director") }
            console.log("bu kişi = " + job)

        }
    }, [isLoading1, data1]);

    /*bulunduğu filmler için fetch*/
    useEffect(() => {
        if (!isLoading2 && data2 !== null && data2.length !== 0) {
            if (job === "Actor") {
                const filteredCast = data2.cast.filter((item: any) => !item.character.includes('(voice)'));
                const sortedCast = filteredCast.sort((a: any, b: any) => b.popularity - a.popularity);
                const top5Films = sortedCast.slice(0, 5);
                setPopMovies(top5Films);
            }
            if (job === "Director") {
                const filteredCast = data2.crew.filter((item: any) => item.department.includes("Directing"));
                const sortedCast = filteredCast.sort((a: any, b: any) => b.popularity - a.popularity);
                const top5Films = sortedCast.slice(0, 5);
                setPopMovies(top5Films);
            }
        }

    }, [isLoading2, data2, data1, isLoading1]);
    /* api responseları karışık olduğu için burada zorunlu olarak array işlemleri yapmam gerekti  */


    return (
        { isLoading1, isLoading2 }
    )
};

export default personFetch;
