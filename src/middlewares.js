//토큰 유효성 검사
const passport = require("passport");
const Student = require("./models/Student");
const { Strategy: LocalStrategy } = require("passport-local");

module.exports.passport = (req, res) => {
  passport.use(
    new LocalStrategy(function (username, password, done) {
      console.log("hi");
      Student.findOne({ id: username }, function (err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.verifyPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );
};

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
