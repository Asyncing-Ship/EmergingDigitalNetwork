const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * Get all of the posts on the table
 */
router.post("/", rejectUnauthenticated, (req, res) => {
  const user_id = req.user.id;
  const queryText = `INSERT INTO profile(user_id, avatar, bio) VALUES ($1,$2,$3)`;
  pool
    .query(queryText, [user_id, "", "No Biography Yet"])
    .then((result) => {
      res.sendStatus(203);
    })
    .catch((error) => {
      console.log(
        "ERROR POSTING NEW PROFILE: profile.router.js LINE 14:",
        error
      );
    });
});
router.get("/", (req, res) => {
  const user_id = req.user.id;
  console.log("getting profile", req.user, user_id);
  const queryText = `SELECT * FROM profile WHERE user_id = $1`;
  pool
    .query(queryText, [user_id])
    .then((result) => {
      console.log(result.rows);
      res.send(result.rows);
    })
    .catch((error) => {
      console.log("Error making SELECT from profile", error);
      res.sendStatus(500);
    });
});

/**
 * Add an posts for the logged in user to the table
 */
router.get("/posts", (req, res) => {
  console.log("Getting user posts from database");
  const user_id = req.user.id;
  const queryText = `
    SELECT * FROM posts WHERE user_id = $1 ORDER BY id DESC`;
  pool
    .query(queryText, [user_id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => console.log("Error getting user posts", error));
});

router.get("/links", (req, res) => {
  console.log("Getting user links from database");
  const user_id = req.user.id;
  const queryText = `
      SELECT * FROM social_links WHERE user_id = $1`;
  pool
    .query(queryText, [user_id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => console.log("Error getting user links", error));
});

/**
 * Update an posts if it's something the logged in user added
 */
// router.put("/", rejectUnauthenticated, (req, res) => {
//   let post_title = req.body.post_title;
//   let post_body = req.body.post_body;
//   let id = req.params.id;
//   let user_id = req.user.id;
//   const queryText = `
//     UPDATE posts SET post_title = $1, post_body = $2 WHERE id = $3 AND user_id = $4`;
//   pool
//     .query(queryText, [post_title, post_body, id, user_id])
//     .then(() => res.sendStatus(204))
//     .catch((error) => console.log(error));
// });

/**
 * Return all users along with the total number of posts
 * they have added to the table
 */
// router.get("/count", (req, res) => {});

/**
 * Return a specific posts by id
 */
// router.get("/:id", (req, res) => {});

module.exports = router;
