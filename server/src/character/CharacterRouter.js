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

router.get("/api/fav-chars/:id", async (req, res, next) => {
  const userId = req.params.id;
  const characters = await CharacterService.getByUserId(userId);

  if (!characters) {
    return next(new ValidationException("Can't find characters for this user"));
  }

  return res.json({ characters });
});

module.exports = router;
