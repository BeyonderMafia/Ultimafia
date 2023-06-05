const express = require("express");
const models = require("../db/models");
const routeUtils = require("./utils");
const { textIncludesSlurs } = require("../react_main/src/lib/profanity");
const {
  maxNumWordsInAnonymousDeck,
  maxOwnedDecks,
} = require("../data/constants");
const logger = require("../modules/logging")(".");
const router = express.Router();

router.get("/:id", async function (req, res) {
  res.setHeader("Content-Type", "application/json");
  try {
    let deckId = String(req.params.id);
    let deck = await models.AnonymousDeck.findOne({ id: deckId })
      .select("id name creator disabled words")
      .populate("creator", "id name avatar tag -_id");

    if (deck) {
      deck = deck.toJSON();
      res.send(deck);
    } else {
      res.status(500);
      res.send("Unable to find deck.");
    }
  } catch (e) {
    logger.error(e);
    res.status(500);
    res.send("Unable to find deck.");
  }
});

router.post("/create", async function (req, res) {
  try {
    const userId = await routeUtils.verifyLoggedIn(req);
    var user = await models.User.findOne({ id: userId, deleted: false });

    if (user.anonymousDecks.length >= user.itemsOwned.anonymousDecks) {
      res.status(500);
      res.send("You need to purchase more anonymous decks from the shop.");
      return;
    }

    let deck = Object(req.body);
    deck.name = String(deck.name || "");
    deck.words = Object(deck.words);

    if (!deck.name || !deck.name.length) {
      res.status(500);
      res.send("You must give your deck a name.");
      return;
    }

    let [slurWord, truncatedWords] = verifyDeckWords(deck.words);
    if (slurWord) {
      res.status(500);
      res.send(`The following word is banned: ${slurWord}`);
      return;
    }

    deck.words = truncatedWords;

    deck.id = shortid.generate();
    deck.creator = req.session.user._id;

    let deckModel = new models.AnonymousDeck(deck);
    await deckModel.save();
    await models.User.updateOne(
      { id: userId },
      { $push: { anonymousDecks: deckModel._id } }
    ).exec();
    res.send(deck.id);
  } catch (e) {
    logger.error(e);
    res.status(500);
    res.send("Unable to make deck.");
  }
});

router.post("/edit", async function (req, res) {
  try {
    const userId = await routeUtils.verifyLoggedIn(req);
    let deck = Object(req.body);

    let deckObj = await models.AnonymousDeck.findOne({ id: deckObj.id })
      .select("creator")
      .populate("creator", "id");

    if (!deckObj || deckObj.creator.id != userId) {
      res.status(500);
      res.send("You can only edit decks you have created.");
      return;
    }

    if (!deck.name || !deck.name.length) {
      res.status(500);
      res.send("You must give your deck a name.");
      return;
    }

    let [slurWord, truncatedWords] = verifyDeckWords(deck.words);
    if (slurWord) {
      res.status(500);
      res.send(`The following word is banned: ${slurWord}`);
      return;
    }

    deckObj.words = truncatedWords;

    await models.AnonymousDeck.updateOne(
      { id: deck.id },
      { $set: deckObj }
    ).exec();
    res.send(deck.id);
  } catch (e) {
    logger.error(e);
    res.status(500);
    res.send("Unable to edit deck.");
  }
});

router.post("/delete", async function (req, res) {
  try {
    const userId = await routeUtils.verifyLoggedIn(req);
    let deckId = req.body.deckId;

    let deck = await models.AnonymousDeck.findOne({
      id: deckId,
    })
      .select("name creator")
      .populate("creator", "id");

    if (!deck || deck.creator.id != userId) {
      res.status(500);
      res.send("You can only delete decks you have created.");
      return;
    }

    await models.AnonymousDeck.deleteOne({
      id: deckId,
    }).exec();

    res.send(`Deleted deck ${deck.name}`);
    return;
  } catch (e) {
    logger.error(e);
    res.status(500);
    res.send("Unable to delete anonymous deck.");
  }
});

router.post("/disable", async function (req, res) {
  try {
    const userId = await routeUtils.verifyLoggedIn(req);
    let deckId = req.body.deckId;

    if (
      !(await routeUtils.verifyPermission(res, userId, "disableAnonymousDeck"))
    ) {
      return;
    }

    let deck = await models.AnonymousDeck.findOne({ id: deckId });
    if (!deck) {
      res.status(500);
      res.send("Deck not found.");
      return;
    }

    await models.AnonymousDeck.updateOne(
      { id: deckId },
      { disabled: !deck.disabled }
    ).exec();

    routeUtils.createModAction(userId, "Toggle Disabled Anonymous Deck", [
      deckId,
    ]);
    res.sendStatus(200);
  } catch (e) {
    logger.error(e);
    res.status(500);
    res.send("Unable to toggle disable on anonymous deck.");
  }
});

router.post("/feature", async function (req, res) {
  try {
    const userId = await routeUtils.verifyLoggedIn(req);
    let deckId = req.body.deckId;

    if (
      !(await routeUtils.verifyPermission(res, userId, "featureAnonymousDeck"))
    ) {
      return;
    }

    let deck = await models.AnonymousDeck.findOne({ id: deckId });
    if (!deck) {
      res.status(500);
      res.send("Deck not found.");
      return;
    }

    await models.AnonymousDeck.updateOne(
      { id: deckId },
      { featured: !deck.featured }
    ).exec();

    routeUtils.createModAction(userId, "Toggle Featured Anonymous Deck", [
      deckId,
    ]);
    res.sendStatus(200);
  } catch (e) {
    logger.error(e);
    res.status(500);
    res.send("Unable to toggle feature on anonymous deck.");
  }
});

router.get("/featured", async function (req, res) {
  res.setHeader("Content-Type", "application/json");
  try {
    var userId = await routeUtils.verifyLoggedIn(req, true);
    var pageSize = 7;
    var pageLimit = 10;
    var start = ((Number(req.query.page) || 1) - 1) * pageSize;
    var deckLimit = pageSize * pageLimit;

    if (!utils.verifyGameType(gameType)) {
      res.send({ decks: [], pages: 0 });
      return;
    }

    if (start < deckLimit) {
      let decks = await models.AnonymousDeck.find({ featured: true })
        .skip(start)
        .limit(pageSize)
        .select("id name featured");
      let count = await models.AnonymousDeck.countDocuments({
        featured: true,
      });

      res.send({
        decks: decks,
        pages: Math.min(Math.ceil(count / pageSize), pageLimit) || 1,
      });
    } else res.send({ decks: [], pages: 0 });
  } catch (e) {
    logger.error(e);
    res.send({ decks: [], pages: 0 });
  }
});

router.get("/search", async function (req, res) {
  res.setHeader("Content-Type", "application/json");
  try {
    var userId = await routeUtils.verifyLoggedIn(req, true);
    var pageSize = 7;
    var pageLimit = 5;
    var start = ((Number(req.query.page) || 1) - 1) * pageSize;
    var deckLimit = pageSize * pageLimit;

    if (!utils.verifyGameType(gameType)) {
      res.send({ decks: [], pages: 0 });
      return;
    }

    if (start < deckLimit) {
      var decks = await models.AnonymousDeck.find({
        name: { $regex: String(req.query.query), $options: "i" },
        gameType,
      })
        .sort("played")
        .limit(deckLimit)
        .select("id gameType name roles closed count featured -_id");
      var count = decks.length;
      decks = decks.slice(start, start + pageSize);

      res.send({
        decks: decks,
        pages: Math.min(Math.ceil(count) / pageSize, pageLimit) || 1,
      });
    } else res.send({ decks: [], pages: 0 });
  } catch (e) {
    logger.error(e);
    res.send({ decks: [], pages: 0 });
  }
});

router.get("/yours", async function (req, res) {
  res.setHeader("Content-Type", "application/json");
  try {
    var userId = await routeUtils.verifyLoggedIn(req);
    var pageSize = 7;
    var start = ((Number(req.query.page) || 1) - 1) * pageSize;
    var deckLimit = maxOwnedDecks;
    var pageLimit = Math.ceil(deckLimit / pageSize);

    if (!userId) {
      res.send({ decks: [], pages: 0 });
      return;
    }

    let user = await models.User.findOne({ id: userId, deleted: false })
      .select("anonymousDecks")
      .populate({
        path: "anonymousDecks",
        select: "id name words featured -_id",
        options: { limit: deckLimit },
      });

    if (!user) {
      res.send({ decks: [], pages: 0 });
      return;
    }

    let decks = user.anonymousDecks;
    let count = decks.length;
    decks = decks.reverse().slice(start, start + pageSize);

    res.send({
      decks: decks,
      pages: Math.min(Math.ceil(count / pageSize), pageLimit),
    });
  } catch (e) {
    logger.error(e);
    res.send({ decks: [], pages: 0 });
  }
});

function verifyDeckWords(words) {
  for (let w in words) {
    w = String(w);
    if (textIncludesSlurs(w)) {
      return [w, []];
    }
  }

  words.length = Math.min(words.length, maxNumWordsInAnonymousDeck);
  return [undefined, words];
}

module.exports = router;
