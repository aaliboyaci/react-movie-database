import React, { useEffect } from 'react'
import useFetch from "../Hooks/useFetch";
import { baseUrl, apiKey } from '../Services/tmdbApiServices';


export interface PersonDetails {
    id: number;
    name: string;
    profile_path: string;
    known_for: { id: number; title: string; poster_path: string }[];
    known_for_department: string;
    biography: string;
    birthday: string
    place_of_birth: string;
   
  }

const personFetch =  (setPersonDetails: React.Dispatch<React.SetStateAction<PersonDetails | null>>, personId: string |undefined) => {

    const { isLoading, data, error }: any = useFetch(`${baseUrl}person/${personId}?api_key=${apiKey}`);
    const{isloa, data2, err2}: any = useFetch(`${baseUrl}person/${personId}/popular?api_key=${apiKey}`)
    console.log("persondata2=" + data2) /*404 HATASI*/
  
    useEffect(() => {
        if (!isLoading && data !== null && data.length !== 0) {
            setPersonDetails(data);
            console.log("persondata=" + data)
        }
    }, [isLoading, data]);

    

    // useEffect(() => {
    //     if (!isloa && data2 !== null && data2.length !== 0) {
            
    //         console.log("persondata2=" + data2)
    //     }
    // }, [isloa, data2]);

    
    return (
        isLoading
     )
};

export default personFetch;
