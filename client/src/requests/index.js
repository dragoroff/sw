import axios from "axios";

import urls from "./urls";

export const getCharacters = async (pageNum = 1) => {
  return axios.get(`${urls.getCharacters}?page=${pageNum}`).then((res) => {
    const result = res.data.results;
    return result;
  });
};

export const getTotalCount = async () => {
  return axios.get(urls.getCharacters).then((res) => {
    const count = res.data.count;
    return count;
  });
};

export const getData = async () => {
  const limit = 10;
  const totalChars = await getTotalCount();
  const characters = [];

  for (let num = 0; num < Math.ceil(totalChars / limit); num++) {
    const data = await getCharacters(num + 1);
    characters.push(...data);
  }

  return characters;
};