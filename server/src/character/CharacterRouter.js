const express = require("express");
const ValidationException = require("../errors/ValidationException");
const CharacterService = require("./CharacterService");
const { cookiesHandler, cookieName } = require("../utils/Cookies");
const router = express.Router();

router.post("/api/add-characters", async (req, res, next) => {
  // 1. save favourite chars to db
  // 2. check if cookie exists -> update if yes, add if not
  // 3. if cookie doesn't exists -> set cookie to user
  const { characters } = req.body;

  if (!characters || !characters.length) {
    return next(new ValidationException());
  }

  if (req.cookies[cookieName]) {
    await CharacterService.update(characters, req.cookies[cookieName]);
  } else {
    const userId = await CharacterService.save(characters);
    res = cookiesHandler(res, userId);
  }

  return res.send(200);
});

router.get("/api/fav-chars/:id", (req, res) => {});

module.exports = router;
