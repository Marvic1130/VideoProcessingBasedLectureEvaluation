const bcrypt = require("bcrypt");
const path = require("path");
const Student = require("../models/Student");
const Professor = require("../models/Professor");
const jwt = require("jsonwebtoken");
const passport = require("passport");

//이름, 아이디, 패스워드, 소속대학, 학과, 학번

module.exports.getLogin = async (req, res) => {
  return res.sendFile(path.join(__dirname + "../../../front/login.html"));
};
module.exports.home = async (req, res) => {
  return res.sendFile(path.join(__dirname + "../../../front/class.html"));
};
module.exports.studentJoin = async (req, res) => {
  const { id, pw, college, name, department, sNum } = req.body;
  const encryption = bcrypt.hashSync(pw, 5);

  try {
    await Student.create({
      //db 모델에 맞는 데이터 생성
      name,
      id,
      pw: encryption,
      sNum,
      college,
      department,
    });
    return res.redirect("/login");
  } catch (err) {
    //err 확인 코드
    console.log(err);
  }
};
//이름, 아이디, 패스워드, 소속대학, 학과,사번

module.exports.getLogin = async (req, res) => {
  return res.sendFile(path.join(__dirname + "../../../front/login.html"));
};

module.exports.getLectureEvaluation = async (req, res) => {
  return res.sendFile(
    path.join(__dirname + "../../../front/lectureEvaluation.html")
  );
};

module.exports.getClassStudent = async (req, res) => {
  return res.sendFile(
    path.join(__dirname + "../../../front/classStudent.html")
  );
};

module.exports.professorJoin = async (req, res) => {
  const { id, pw, college, name, department, pNum } = req.body;

  const encryption = bcrypt.hashSync(pw, 5);
  try {
    await Professor.create({
      name,
      id,
      pw: encryption,

      pNum,
      college,
      department,
    });
    return res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
};

module.exports.login = async (req, res) => {
  try {
    // 아까 local로 등록한 인증과정 실행
    passport.authenticate("local", (passportError, user, info) => {
      // 인증이 실패했거나 유저 데이터가 없다면 에러 발생
      if (passportError || !user) {
        res.status(400).json({ message: info });
        return;
      }
      // user데이터를 통해 로그인 진행
      req.login(user, { session: false }, (loginError) => {
        if (loginError) {
          res.send(loginError);
          return;
        }
        // 클라이언트에게 JWT생성 후 반환
        const token = jwt.sign(
          { id: user.id, name: user.name, auth: user.auth },
          process.env.ACCESS_SECRET,
          { expiresIn: "1m", issuer: "jungseok" }
        );
        const refresh = jwt.sign(
          {
            id: user.id,
            name: user.name,
            auth: user.auth,
          },
          process.env.REFRESH_SECRET,
          { expiresIn: "10m", issuer: "jungseok" }
        );
        console.log("token: ", token);
        console.log("refresh:", refresh);
        res.redirect("/main");
      });
    })(req, res);
  } catch (error) {
    console.error(error);
    next(error);
  }
};

module.exports.logout = async (req, res) => {
  const { id, pw, college, name, department, pNum } = req.body;
  try {
    await Professor.create({
      name,
      id,
      pw,
      pNum,
      college,
      department,
    });
    return res.redirect("/login");
  } catch (err) {
    console.log(err);
  }
};
