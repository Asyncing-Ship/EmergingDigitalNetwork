const express = require("express");
require("dotenv").config();

const app = express();
const bodyParser = require("body-parser");
const sessionMiddleware = require("./modules/session-middleware");

const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const postsRouter = require("./routes/posts.router");
const resourcesRouter = require("./routes/resources.router");
const membersRouter = require("./routes/members.router");
const profileRouter = require("./routes/profile.router");
const likesRouter = require("./routes/likes.router");

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/posts", postsRouter);
app.use("/api/resources", resourcesRouter);
app.use("/api/members", membersRouter);
app.use("/api/profile", profileRouter);
app.use("/api/likes", likesRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
  console.log(Date());
});
