const local = require("./localStrategy");
const passport = require("passport");
const Student = require("../models/Student");
const Professor = require("../models/Professor");

module.exports = () => {
  passport.serializeUser((user, done) => {
    // router의 req.login 요청이 들어오면 실행된다.
    // 역할: 서버 메모리를 아끼기 위해 많은 사용자 정보 중에서 필요한 부분만 메모리에 저장하도록함. (여기에서는 id)
    // 서버쪽에 [{ id: 3, cookie: 'asvxzc' }] 저장, cookie는 프론트로 보냄
    return done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const professor = await Professor.findOne({ where: { id } });
    const student = await Student.findOne({ where: { id } });

    try {
      if (professor) {
        return done(null, professor); // 불러온 user 정보는 req.user에 저장
      } else {
        return done(null, student); // 불러온 user 정보는 req.user에 저장
      }
    } catch (e) {
      console.error(e);
      return done(e);
    }
  });

  local();
};
