const cookieName = "charCookie";

const cookiesHandler = (res, userId) => {
  try {
    res.cookie(cookieName, userId);
  } catch (e) {
    console.log("ERROR", e);
  }

  return res;
};

module.exports = { cookiesHandler, cookieName: cookieName };
