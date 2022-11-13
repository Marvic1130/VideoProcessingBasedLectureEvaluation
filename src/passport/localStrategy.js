const passport = require("passport");
const { Strategy: LocalStrategy } = require("passport-local");
const bcrypt = require("bcrypt");
const Student = require("../models/Student");

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        // 프론트에서 req.body에 넣어주는 정보. 객체 key 값을 정확히 적어줘야한다.
        usernameField: "id", // req.body = { userId: 'abcd', passport: 'xxx' }
        passwordField: "pw",
      },
      async (id, pw, done) => {
        try {
          const student = await Student.findOne({ where: { id } });
          if (!student) {
            // 유저가 있는지 확인 후 유저가 없다면
            return done(null, false, { reason: "존재하지 않는 사용자입니다." });
          }
          const result = await bcrypt.compare(pw, student.pw);
          if (result) {
            // 유저가 있다면 비밀번호 확인 후 done 두 번째 인자로 유저 정보 넘김
            return done(null, student);
          }
          return done(null, false, { reason: "비밀번호가 틀립니다." }); // 비밀번호 틀렸을 때
        } catch (e) {
          console.error(e);
          return done(e); // 서버 에러가 있는 경우 done 첫 번째 인자로 error 정보 넘김
        }
      }
    )
  );
};
