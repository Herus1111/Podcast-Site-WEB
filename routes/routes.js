const express = require("express");
// [TODO]
const db = require("../models/persistence");
// Include other required modules

const router = express.Router();

router.get("/", function (req, res) {
  // [TODO]
  res.render("index", {podcasts: db.podcasts});
  // Implement: Display list of subscribed podcasts
});

router.get("/podcast", function (req, res) {
  // [TODO]
  // pc = Podcast Counter
  const pc = req.query.pc;
  res.render("podcast", { podcast: db.podcasts[pc], 
                          pc: pc
  });
  // Implement: Show detail page for the podcast with the given
  // index (index is provided as a request/query parameter,
  // access with: req.query.pc)
});

router.get("/episode", function (req, res) {
  // [TODO]
  const pc = req.query.pc;
  const ep = req.query.ep;
  res.render("episode", { episode: db.podcasts[pc].episoden[ep] });
  // Implement: Show detail page for the episode (indices
  // are provided as request/query parameters, access with:
  // req.query.pc and req.query.ep)
});

router.post("/subscribe", function (req, res) {
  // [TODO]
  db.subscribe(req.body.urlPodc, () => {
    res.redirect("/");
  });
  // Implement: Subscribe to a podcast
});

module.exports = router;
