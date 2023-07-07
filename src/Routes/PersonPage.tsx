import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from '../Components/Loading';
import personFetch, { PersonDetails } from '../Services/personFetch';


const PersonPage: React.FC = () => {
    const { personId } = useParams<{ personId: string }>();
    const [personDetails, setPersonDetails] = useState<PersonDetails | null>(null);
    const isLoading = personFetch(setPersonDetails, personId);
    console.log(personDetails)

    if (!personDetails) {
        return <Loading />;
    }

    return (
        <div>
            <h1>{personDetails.name}</h1>
            <img src={`https://image.tmdb.org/t/p/w500/${personDetails.profile_path}`} alt={personDetails.name} />
            <p>Biography: {personDetails.biography}</p>
            <p>Birthday: {personDetails.birthday}</p>
            <p>Place of Birth: {personDetails.place_of_birth}</p>
            <h2>Popular Movies:</h2>
           
        </div>
    );
};

export default PersonPage;
