export const makeImgPath = (img: string, width: string = "w500") => {
  return `https://image.tmdb.org/t/p/${width}/${img}`;
};

export const makeVideoPath = (key: string) => {
  return `https://m.youtube.com/watch?v=${key}`;
};
