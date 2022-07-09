
export const ENDPOINTS = {
    NOW_PLAYING_MOVIES: "/movie/now_playing",
    UPCOMING_MOVIES: "/movie/upcoming",
    GENRES: "/genre/movie/list",
    MOVIE: "/movie",
    MOVIE_IMAGES: "movie/${movieId}/images"
  };
  //https://api.themoviedb.org/3/movie/{movie_id}/images?api_key=<<api_key>>&language=en-US
  const APPEND_TO_RESPONSE = {
    VIDEOS: "videos",
    CREDITS: "credits",
    RECOMMENDATIONS: "recommendations",
    SIMILAR: "similar",
  };
  
//   export {
//     TMDB_BASE_URL,
//     TMDB_API_KEY,
//     TMDB_IMAGE_BASE_URL,
//     ENDPOINTS,
//     APPEND_TO_RESPONSE,
//     YOUTUBE_BASE_URL,
//   };
  