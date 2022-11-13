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

module.exports.getClassProfessor = async (req, res) => {
  return res.sendFile(
    path.join(__dirname + "../../../front/classProfessor.html")
  );
};

module.exports.getSelectSignup = async (req, res) => {
  return res.sendFile(
    path.join(__dirname + "../../../front/selectSignup.html")
  );
};

module.exports.getStudentSignup = async (req, res) => {
  return res.sendFile(
    path.join(__dirname + "../../../front/studentSignup.html")
  );
};

module.exports.getProfessorSignup = async (req, res) => {
  return res.sendFile(
    path.join(__dirname + "../../../front/professorSignup.html")
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
  app.post(
    "/login",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/login",
    })
  );
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

exports.isLoggedIn = (req, res, next) => {
  // isAuthenticated()로 검사해 로그인이 되어있으면
  if (req.isAuthenticated()) {
    next(); // 다음 미들웨어
  } else {
    res.status(403).send("로그인 필요");
  }
};

exports.isNotLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next(); // 로그인 안되어있으면 다음 미들웨어
  } else {
    const message = encodeURIComponent("로그인한 상태입니다.");
    res.redirect(`/?error=${message}`);
  }
};
