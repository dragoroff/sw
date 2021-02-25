import { getCharacters } from "../requests";

// export async function* getData() {
//   let pageNum = 1;
//   const limit = 10;

//   const request = async () => {
//     try {
//       const response = await getCharacters(pageNum);
//       return response;
//     } catch (err) {
//       console.log("ERR", err);
//     }
//   };

//   let data;
//   while (!data || data.length) {
//     data = await request();
//     console.log("data", data);
//     yield data;

//     if (data && data.length < limit) {
//       break;
//     }

//     pageNum++;
//   }
// }
