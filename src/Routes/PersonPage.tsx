import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Components/Loading';
import personFetch, { PersonDetails } from '../Services/personFetch';
import "./personPage.css";


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
        <div className="containerPP">
            <h1 className="titlePP">{personDetails.name}</h1>
            <img className="imagePP" src={`https://image.tmdb.org/t/p/w500/${personDetails.profile_path}`} alt={personDetails.name} />
            <p className="infoPP"> <b>Known for:</b> {personDetails.known_for_department}</p>
            {personDetails.birthday && <p className="infoPP" ><b>Birthday:</b> {personDetails.birthday}</p>}
            <p className="infoPP" ><b>Gender :</b> {(personDetails.gender === 1) ? (<>Woman</>) : (<>Man</>)}</p>
            {personDetails.place_of_birth && <p className="infoPP" ><b>Place of Birth: </b>{personDetails.place_of_birth}</p>}
            {personDetails.homepage && <p className='infoPP'><a href={personDetails.homepage} target="_blank">Website: {personDetails.homepage}</a> </p>}
            <hr></hr>
            <h2>Popular Movies:</h2>
            {(popMovies == null || popMovies.length == 0) ? (
                <p><Loading /></p>
            ) : (
                popMovies.map((movie: any) => (
                    <div
                        key={movie.id}
                        onClick={() => handleGenreClick(movie.id)} >
                        <div className="moviePP" >{movie.title}</div>

                    </div>
                ))
            )}
            <br></br>
            <hr></hr>

            {personDetails.biography && <div className="bioPP">
                <b>Biography:</b> {isExpanded ? personDetails.biography : `${personDetails.biography.slice(0, 200)}...`}<br></br>
                <button onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? "Hide" : "Show more"}
                </button></div>}
        </div>
    );
};

export default PersonPage;
