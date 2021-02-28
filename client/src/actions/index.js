import axios from "axios";
import Cookies from "js-cookie";

import urls from "./urls";
import { SERVER_URL } from "../config";

export const getData = async (url) => {
  return axios.get(url).then((res) => {
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

export const getCharacters = async () => {
  const limit = 10;
  let totalChars;

  try {
    totalChars = await getTotalCount();
  } catch (e) {}

  const characters = [];

  for (let num = 0; num < Math.ceil(totalChars / limit); num++) {
    let data;

    try {
      data = await getData(`${urls.getCharacters}?page=${num + 1}`);
    } catch (e) {}

    if (data) {
      characters.push(...data);
    }
  }

  return characters;
};

export const postFavouriteChars = async (chars) => {
  await axios.post(
    `${SERVER_URL}/api/add-characters`,
    {
      characters: chars,
    },
    { withCredentials: true }
  );

  const userId = Cookies.get("charCookie");
  return userId;
};
