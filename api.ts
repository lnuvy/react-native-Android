const API_KEY = "71f43de951c136a669bee61f1fbf4c5b";
const BASE_URL = "https://api.themoviedb.org/3";

export interface TV {
  name: string;
  original_name: string;
  origin_country: string[];
  vote_count: number;
  backdrop_path: string | null;
  vote_average: number;
  genre_ids: number[];
  id: number;
  original_language: string;
  overview: string;
  poster_path: string | null;
  first_air_date: string;
  popularity: number;
  media_type: string;
}
export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export const moviesAPI = {
  trending: ({ pageParam }) =>
    fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}&page=${
        pageParam ?? 1
      }`
    ).then((res) => res.json()),
  upComing: ({ pageParam }) =>
    fetch(
      `${BASE_URL}/movie/upcoming?api_key=${API_KEY}&language=en-US&page=${
        pageParam ?? 1
      }&region=KR`
    ).then((res) => res.json()),
  nowPlaying: () =>
    fetch(
      `${BASE_URL}/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1&region=KR`
    ).then((res) => res.json()),
  search: ({ queryKey }) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&language=en-US&page=1&region=KR&query=${query}`
    ).then((res) => res.json());
  },
  detail: ({ queryKey }) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};

export const tvAPI = {
  trending: ({ pageParam }) =>
    fetch(
      `${BASE_URL}/trending/tv/week?api_key=${API_KEY}&region=KR&page=${
        pageParam ?? 1
      }`
    ).then((res) => res.json()),
  airingToday: ({ pageParam }) =>
    fetch(
      `${BASE_URL}/tv/airing_today?api_key=${API_KEY}&region=KR&page=${
        pageParam ?? 1
      }`
    ).then((res) => res.json()),
  topRated: ({ pageParam }) =>
    fetch(
      `${BASE_URL}/tv/top_rated?api_key=${API_KEY}&region=KR&page=${
        pageParam ?? 1
      }`
    ).then((res) => res.json()),
  search: ({ queryKey }) => {
    const [_, query] = queryKey;
    return fetch(
      `${BASE_URL}/search/tv?api_key=${API_KEY}&language=en-US&page=1&region=KR&query=${query}`
    ).then((res) => res.json());
  },
  detail: ({ queryKey }) => {
    const [_, id] = queryKey;
    return fetch(
      `${BASE_URL}/tv/${id}?api_key=${API_KEY}&append_to_response=videos,images`
    ).then((res) => res.json());
  },
};
