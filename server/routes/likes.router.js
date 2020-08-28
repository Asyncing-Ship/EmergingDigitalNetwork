const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

router.put("/resources", (req, res) => {
  console.log("adding resource like to the database", req.body.id);
  const resourceID = [req.body.id];
  const queryText = `UPDATE resources 
    SET upvote_count = upvote_count + 1
  WHERE "id" = $1`;
  pool
    .query(queryText, resourceID)
    .then((response) =>
      console.log("like added to resource on database", response)
    )
    .catch((error) => console.log(error));
});

router.put("/posts", (req, res) => {
  console.log("adding post like to the database", req.body.id);
  const resourceID = req.body.id;
  const queryText = `INSERT INTO "post_likes" (user_id, post_id)
    VALUES( $1, $2);`;
  pool
    .query(queryText, [req.user.id, resourceID])
    .then((response) => {
      console.log("like added to post on database", response);
      res.sendStatus(203);
    })
    .catch((error) => console.log(error));
});

module.exports = router;
