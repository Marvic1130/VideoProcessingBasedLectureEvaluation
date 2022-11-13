//토큰 유효성 검사
const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
passport.use(
  new LocalStrategy(
    {
      usernameField: "id",
      passwordField: "pw",
    },
    function (username, password, done) {
      let result = login(username, password);

      if (result === -1)
        return done(null, false, { message: "Incorrect username." });
      else if (result === 0)
        return done(null, false, { message: "Incorrect password." });
      else return done(null, { id: username });
    }
  )
);
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  done(null, id);
});

// const jwt = require("jsonwebtoken");
// const authToken = (req, res, next) => {
//   if (req.headers.authorization) {
//     let header = req.headers["authorization"];
//     let token = header && header.split(" ")[1];

//     jwt.verify(token, process.env.ACCESS_SECRET, (err, user) => {
//       if (err) {
//         console.log("만료");
//         res.status(404).json(err);
//       } else {
//         req.user = user;
//         next();
//       }
//     });
//   } else {
//     res.status(401).json({ error: "Auth Error" });
//   }
// };

// module.exports = authToken;
