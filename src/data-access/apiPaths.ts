

export const apiKey: string = `6ef10486c5df46ca61884c8b042d53bd`;
export const baseUrl: string = `https://api.themoviedb.org/3/`;

//spesifik urller burada
export const genreListUrl: string = `${baseUrl}genre/movie/list?api_key=${apiKey}`;

export const trendUrl: string = `${baseUrl}trending/movie/week?api_key=${apiKey}`;


//movie poster img src
export const posterBaseUrl: string = `https://image.tmdb.org/t/p/w500/`

//random movie url
export const randomMovieURL : string = `${baseUrl}discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=`;

