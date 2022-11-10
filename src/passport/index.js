const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
//const { ExtractJwt, Strategy: JWTStrategy } = require("passport-jwt");
const bcrypt = require("bcrypt");

const Student = require("../models/Student");
//const professor = require("../models/Professor");

const passportConfig = { usernameField: "id", passwordField: "pw" };

const passportVerify = async (id, pw, done) => {
  try {
    const user = await Student.findOne({ where: { id } });
    if (!user) {
      done(null, false, { message: "존재하지 않는 사용자 입니다." });
      return;
    }

    const compareResult = await bcrypt.compare(pw, user.pw);

    if (compareResult) {
      done(null, user);
      return;
    }

    done(null, false, { reason: "올바르지 않은 비밀번호 입니다." });
  } catch (error) {
    console.error(error);
    done(error);
  }
};

// const JWTConfig = {
//   jwtFromRequest: ExtractJwt.fromHeader("authorization"),
//   secretOrKey: "jwt-secret-key",
// };

// const JWTVerify = async (jwtPayload, done) => {
//   try {
//     // payload의 id값으로 유저의 데이터 조회
//     const user = await Student.findOne({ where: { id: jwtPayload.id } });
//     // 유저 데이터가 있다면 유저 데이터 객체 전송
//     if (user) {
//       done(null, user);
//       return;
//     }
//     // 유저 데이터가 없을 경우 에러 표시
//     done(null, false, { reason: "올바르지 않은 인증정보 입니다." });
//   } catch (error) {
//     console.error(error);
//     done(error);
//   }
// };

module.exports = () => {
  passport.use("local", new LocalStrategy(passportConfig, passportVerify));
  // passport.use("jwt", new JWTStrategy(JWTConfig, JWTVerify));
};
