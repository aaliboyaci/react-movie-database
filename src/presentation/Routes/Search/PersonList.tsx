import React from "react";
import { Link } from "react-router-dom";
import { DETAILS, PERSON } from "../routes";
import { posterBaseUrl } from '../../../application/Services/tmdbApiServices';
import "../../Routes/Search/SearchPage.css";
import { SearchPersonType } from "../../../application/Types/SearchPersonTypes";

export interface PersonListProps {
  people: SearchPersonType[] | null;
}


const PersonList: React.FC<PersonListProps> = ({ people }) => {
  if (people?.length === 0) {
    return <div className="person-item">No persons found.</div>;
  }

  return (
    <ul className="movie-list">
      {people?.map((person) => (
        <li key={person.personID} className="movie-item">
          <Link to={`${PERSON}${person.personID}`} className="movie-link">
            <img
              src={person.profilePath ? `${posterBaseUrl}${person.profilePath}` : 'src/assets/no-avatar.png'}
              alt={person.personName}
              className="movie-poster"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src = 'src/presentation/assets/no-avatar.png';
              }}
            />
            <div className="movie-info">
              <div className="movie-name">{person.personName}</div>
              <p className="movie-year">{person.personJob}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PersonList;
