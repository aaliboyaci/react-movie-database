export interface MovieCastDetailsDTO {
  id: number;
  name: string;
  crew?: CrewMemberDTO[];
  department?: string;
  job?: string;
  cast?: CastMemberDTO[];
}

export interface CrewMemberDTO {
  job: string;
  department: string;
  name: string;
  id: number;
}

export interface CastMemberDTO {
  id: number;
  name: string;
}
// Data Transfer Object
