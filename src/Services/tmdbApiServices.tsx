

export const apiKey : string = `6ef10486c5df46ca61884c8b042d53bd`;
export const baseUrl : string = `https://api.themoviedb.org/3/`;

/*random movie generator */

export const randomPage :  number = Math.floor(Math.random() * 40) + 1;
export const randomMovieUrl : any = `${baseUrl}discover/movie?api_key=${apiKey}&sort_by=popularity.desc&page=${randomPage}`;


