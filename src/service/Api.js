//import axios from "axios";


// var myHeaders = new Headers();
// myHeaders.append("api_key", "53939b3da3d575c42c212fb77c52c5a5");

// var requestOptions = {
//   method: 'GET',
//   Api_Key: '53939b3da3d575c42c212fb77c52c5a5',
//   //   headers: myHeaders,
//   //redirect: 'follow'
// };
// var qs = {
//   search: ''
// };
const axios = require("axios").default;


const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";
const YOUTUBE_BASE_URL = "https://www.youtube.com/watch";
const ENDPOINTS = {
  NOW_PLAYING_MOVIES: "/movie/now_playing",
  UPCOMING_MOVIES: "/movie/upcoming",
  GENRES: "/genre/movie/list",
  MOVIE: "/movie",
  MOVIE_IMAGES: "movie/${movieId}/images"
};
const APPEND_TO_RESPONSE = {
  VIDEOS: "videos",
  CREDITS: "credits",
  RECOMMENDATIONS: "recommendations",
  SIMILAR: "similar",
};
const TMDB_API_KEY = "53939b3da3d575c42c212fb77c52c5a5"
const TMDB_HTTP_REQUEST = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
}); 

export const GET = async url => {
    const API_URL = `https://api.themoviedb.org/3/${url}?api_key=53939b3da3d575c42c212fb77c52c5a5`;
  
    let response = await fetch(
      API_URL, {
        method: 'GET'
      }
      );
    response = response.json();
    return response;
  };
   




  
const getNowPlayingMovies = () =>
TMDB_HTTP_REQUEST.get(ENDPOINTS.NOW_PLAYING_MOVIES);

const getUpcomingMovies = () =>
TMDB_HTTP_REQUEST.get(ENDPOINTS.UPCOMING_MOVIES);

const getMovieById = (movieId, append_to_response = "") =>
TMDB_HTTP_REQUEST.get(
  `${ENDPOINTS.MOVIE}/${movieId}`,
  append_to_response ? { params: { append_to_response } } : null
);


const getAllGenres = () => TMDB_HTTP_REQUEST.get(ENDPOINTS.GENRES);

const getPoster = (path) => `${TMDB_IMAGE_BASE_URL}/original${path}`;

const getVideo = (key) => `${YOUTUBE_BASE_URL}?v=${key}`;

const getLanguage = (language_iso) =>
LANGUAGES.find((language) => language.iso_639_1 === language_iso);

export {
getNowPlayingMovies,
getUpcomingMovies,
getAllGenres,
getMovieById,
getPoster,
getLanguage,
getVideo,
};


  // export const getMovies = async (url,pageCurrentt) => {
    
  //   let response = await fetch(
  //     `https://api.themoviedb.org/3/movie/now_playing?api_key=${requestOptions.Api_Key}&pages=${pageCurrentt}`,
  //     requestOptions,
  //   );
  //   response = response.json();
  //   return response;
  // }
  // export const getSearchMovies = async (search) => {
  //   let response = await fetch(
  //     // `https://api.themoviedb.org/3${url}?api_key=${requestOptions.Api_Key}`,
  //     `https://api.themoviedb.org/3/search/tv?api_key=${requestOptions.Api_Key}&query=${search}`,
  
  //     requestOptions,
  //     qs
  //   );
  //   response = response.json();
  //   return response;
  // }
  
  
  
  