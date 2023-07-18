import React from "react";
import { Link } from "react-router-dom";
import { DETAILS, PERSON } from "../../Routes/routes";
import { posterBaseUrl } from '../../Services/tmdbApiServices';
import "../../Routes/Search/SearchPage.css";


export interface Person {
  adult: boolean;
  gender: number;
  id: number;
  known_for: any[];
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

interface PersonListProps {
  persons: Person[];
}

const PersonList: React.FC<PersonListProps> = ({ persons }) => {
  if (persons.length === 0) {
    return <div className="person-item">No persons found.</div>;
  }

  return (
    <ul className="movie-list">
      {persons.map((person) => (
        <li key={person.id} className="movie-item">
          <Link to={`${PERSON}${person.id}`} className="movie-link">
            <img
              src={person.profile_path ? `${posterBaseUrl}${person.profile_path}` : 'src/assets/no-avatar.png'}
              alt={person.name}
              className="movie-poster"
              onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                e.currentTarget.src = 'src/assets/no-avatar.png';
              }}
            />
            <div className="movie-info">
              <div className="movie-name">{person.name}</div>
              <p className="movie-year">{person.known_for_department}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PersonList;
