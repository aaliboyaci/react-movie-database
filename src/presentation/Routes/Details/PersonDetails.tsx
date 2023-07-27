import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../../Components/Loading';
import "./PersonDetails.css";
import { posterBaseUrl } from '../../../data-access/apiPaths';
import { DETAILS } from '../routes';
import { usePersonDetailsFetch } from '../../../application/FetchActions/personDetailsFetch';


export interface popProps {
    length: number;
    map: any;
    id: number;
    title: string;
}

const PersonPage: React.FC = () => {
    const { personId } = useParams<{ personId: string }>();
    const [isExpanded, setIsExpanded] = useState(false);
    const navigate = useNavigate();

    const { data, isLoading, error } = usePersonDetailsFetch(personId);
    const personData = data?.personDetails
    const popMovies = data?.popMovies

    if (isLoading) { return <Loading />; }

    const handleMovieClick = (movieID: number) => {
        navigate(`${DETAILS}${movieID}`);
    };


    return (
        <div className="containerPP">
            <h1 className="titlePP">{personData?.name}</h1>
            <img className="imagePP" src={`${posterBaseUrl}${personData?.profilPath}`} alt={personData?.name}
                onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = 'src/assets/no-avatar.png';
                }} />
            <p className="infoPP"> <b>Known for:</b> {personData?.knownForDepartment}</p>
            {personData?.birthday && <p className="infoPP" ><b>Birthday:</b> {personData.birthday}</p>}
            <p className="infoPP" ><b>Gender :</b> {(personData?.gender === 1) ? (<>Woman</>) : (<>Man</>)}</p>
            {personData?.placeOfBirth && <p className="infoPP" ><b>Place of Birth: </b>{personData.placeOfBirth}</p>}
            {personData?.website && <p className='infoPP'><a href={personData?.website} target="_blank">Website: {personData?.website}</a> </p>}
            <hr></hr>
            <h2>Popular Movies:</h2>
            {(popMovies == null || popMovies.length === 0) ? (
                <>{error}</>
            ) : (
                popMovies.map((movie: any) => (
                    <div
                        key={movie.id}
                        onClick={() => handleMovieClick(movie.id)} >
                        <div className="moviePP" >{movie.title}</div>
                    </div>
                ))
            )}
            <br></br>
            <hr></hr>

            {personData?.birthday && <div className="bioPP">
                <b>Biography:</b> {isExpanded ? personData.biography : `${personData.biography.slice(0, 200)}...`}<br></br>
                <br></br>
                <button onClick={() => setIsExpanded(!isExpanded)}>
                    {isExpanded ? "Hide" : "Show more"}
                </button></div>}
        </div>
    );
};

export default PersonPage;
