import React from "react";
// import { InfiniteQueryObserverResult } from "react-query";

export const makeImgPath = (img: string, width: string = "w500") => {
  return `https://image.tmdb.org/t/p/${width}/${img}`;
};

export const makeVideoPath = (key: string) => {
  return `https://m.youtube.com/watch?v=${key}`;
};

export const fetchMore = (hasNext: boolean | undefined, fetchNext: Function) =>
  hasNext ? fetchNext() : null;
