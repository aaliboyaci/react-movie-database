import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Components/Loading';
import personFetch, { PersonDetails } from '../Services/personFetch';


export interface popProps {
    length: number;
    map: any;
    id: number;
    title: string;

}
const PersonPage: React.FC = () => {
    const { personId } = useParams<{ personId: string }>();
    const [personDetails, setPersonDetails] = useState<PersonDetails | null>(null);
    const [popMovies, setPopMovies] = useState<popProps | null>(null);
    const { isLoading1, isLoading2 } = personFetch(setPersonDetails, personId, setPopMovies);
    const [isExpanded, setIsExpanded] = useState(false);


    const navigate = useNavigate();

    console.log(personDetails)

    if (!personDetails) { return <Loading />; }
    if (isLoading1 | isLoading2) { return <Loading />; }/*çift fetch olduğu için iki tane loading var*/

    const handleGenreClick = (movieID: number) => {

        navigate(`/Details/${movieID}`);
    };
    { console.log(popMovies) }

    return (
        <div>
            <h1>{personDetails.name}</h1>
            <img src={`https://image.tmdb.org/t/p/w500/${personDetails.profile_path}`} alt={personDetails.name} />
            <p>Biography: {isExpanded ? personDetails.biography : `${personDetails.biography.slice(0, 200)}...`}<br></br>
                <button onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? "Hide" : "Show more"}
                </button></p>
            <p>Birthday: {personDetails.birthday}</p>
            <p>Gender : {(personDetails.gender === 1) ? (<>Woman</>) : (<>Man</>)}</p>
            <p>Place of Birth: {personDetails.place_of_birth}</p>
            <h2>Popular Movies:</h2>
            {(popMovies == null || popMovies.length === 0) ? (
                <p><Loading /></p>
            ) : (
                popMovies.map((movie: any) => (
                    <div
                        key={movie.id}
                        onClick={() => handleGenreClick(movie.id)} >
                        <div >Title movie: {movie.title}</div>

                    </div>
                ))
            )}

        </div>
    );
};

export default PersonPage;
