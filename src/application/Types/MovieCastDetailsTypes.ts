export interface CrewMember {
  job: string;
  department: string;
  name: string;
  id: number;
}

export interface CastMember {
  id: number;
  name: string;
}

export interface MovieCastDetails {
  mainCast?: CastMember[];
  director?: object;
  directorID?: number;
  directorName?: string;
}
