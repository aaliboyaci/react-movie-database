export interface MovieTrailersDTO {
  id: number;
  key: number;
  name: string;
  trailers?: Array<MovieTrailersDTO>;
  results?: Array<string>;
}

// Data Transfer Object
