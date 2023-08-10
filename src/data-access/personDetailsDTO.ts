export interface PersonDetailsDTO {
  id: number;
  name: string;
  profile_path: string;
  known_for: { id: number; title: string; poster_path: string }[];
  known_for_department: string;
  biography: string;
  birthday: string;
  place_of_birth: string;
  gender: number;
  homepage: string;
}
//datatransferobject
