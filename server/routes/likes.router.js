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
  const resourceID = [req.body.id];
  const queryText = `UPDATE posts 
      SET likes = likes + 1
    WHERE "id" = $1`;
  pool
    .query(queryText, resourceID)
    .then((response) =>
      console.log("like added to resource on database", response)
    )
    .catch((error) => console.log(error));
});

module.exports = router;
