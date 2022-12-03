const bcrypt = require("bcrypt");
const path = require("path");
const passport = require("passport");
const { Op } = require("sequelize");

const Student = require("../models/Student");
const Professor = require("../models/Professor");
const Class = require("../models/Class");
const Evaluation = require("../models/Evaluation");

// const spawn = require("await-spawn");
const spawn = require("child_process").spawn;

//이름, 아이디, 패스워드, 소속대학, 학과, 학번
module.exports.home = async (req, res) => {
  return res.sendFile(path.join(__dirname + "../../../front/class.html"));
};

module.exports.selectSignup = async (req, res) => {
  return res.sendFile(
    path.join(__dirname + "../../../front/selectSignup.html")
  );
};

module.exports.getSJoin = async (req, res) => {
  return res.sendFile(
    path.join(__dirname + "../../../front/studentSignup.html")
  );
};

module.exports.getLectureEvaluation = async (req, res) => {
  const result = await spawn("python", [
    path.join(__dirname + "../../../MachineLearning/BlinkingRecognition.py"),
  ]);

  result.stdout.on("data", function (data) {
    console.log(data.toString());
  });
  result.stderr.on("data", function (data) {
    console.log(data.toString());
  });

  return res.sendFile(
    path.join(__dirname + "../../../front/lectureEvaluation.html")
  );
};

module.exports.getDataPage = async (req, res) => {
  return res.sendFile(path.join(__dirname + "../../../front/dataPage.html"));
};

module.exports.getClassStudent = async (req, res) => {
  const { id } = req.user;
  try {
    const allClass = await Class.findAll();

    const classList = await Class.findAll({
      raw: true,
      where: { classId: id },
    });
    return res.render("classStudent", { data: classList, allClass });
  } catch (err) {
    console.log(err);
  }
};

module.exports.getClassProfessor = async (req, res) => {
  const { id } = req.user;
  try {
    const allClass = await Class.findAll();

    const classList = await Class.findAll({
      raw: true,
      where: { classId: id },
    });
    return res.render("classProfessor", { data: classList });
  } catch (err) {
    console.log(err);
  }
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

module.exports.postSJoin = async (req, res) => {
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
    return res.redirect("/");
  } catch (err) {
    //err 확인 코드
    console.log(err);
  }
};
//이름, 아이디, 패스워드, 소속대학, 학과,사번

module.exports.getPJoin = async (req, res) => {
  return res.sendFile(
    path.join(__dirname + "../../../front/professorSignup.html")
  );
};
module.exports.postPJoin = async (req, res) => {
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
    return res.redirect("/");
  } catch (err) {
    console.log(err);
  }
};

module.exports.getLogin = async (req, res) => {
  return res.sendFile(path.join(__dirname + "../../../front/login.html"));
};

module.exports.postLogin = async (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    // (err, user, info) 는 passport의 done(err, data, logicErr) 세 가지 인자
    if (err) {
      // 서버에 에러가 있는 경우
      console.error(err);
      next(err);
    }
    if (info) {
      // 로직 상 에러가 있는 경우
      return res.status(401).send(info.reason);
    }

    return req.login(user, async (loginErr) => {
      const id = user.id;
      // req.login() 요청으로 passport.serializeUser() 실행
      if (loginErr) {
        return next(loginErr);
      } else if (!loginErr) {
        try {
          const student = await Student.findOne({ where: { id } });
          if (student) {
            return res.redirect("/sClass");
          } else {
            return res.redirect("/pClass");
          }
        } catch (error) {
          console.log(error);
        }
      }
    });
  })(req, res, next);
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

module.exports.postClassStudent = async (req, res) => {
  const { id } = req.user;
  try {
    const studentClass = await Student.findAll({
      where: {
        userId: id,
      },
    });
    return res.json({ studentClass });
  } catch (err) {
    console.log(err);
  }
};

module.exports.postClassProfessor = async (req, res) => {
  const { id } = req.user;
  try {
    const professorClass = await Professor.findAll({
      where: {
        userId: id,
      },
    });
    return res.json({ professorClass });
  } catch (err) {
    console.log(err);
  }
};

module.exports.postLectureEvaluation = async (req, res) => {
  //className을 포함한 url처리하기
  const { q1, q2, q3 } = req.body;
  const { className } = req.params;
  const { id } = req.user;

  console.log(req.body);
  console.log(req.params);
  console.log(id);

  try {
    await Evaluation.create({
      q1,
      q2,
      q3,
      className,
      userId: id,
    });
    return res.redirect("/sClass");
  } catch (error) {
    console.log(error);
  }
};

module.exports.postDataPage = async (req, res) => {
  //데이터 가공 방식 설정하기
  const { hiddenValue } = req.body;
  const classList = await Evaluation.findAll({ where: { className } });
};
//--> 미들웨어로 설정
// module.exports.isSubmit = async (req, res) => {
//   const { hiddenValue } = req.body;
//   const { id } = req.user;
//   const exist = await Evaluation.findOne({
//     where: {
//       [Op.and]: [{ className: hiddenValue }, { userId: id }],
//     },
//   });
//   if (exist) {
//     console.log("수강신청을 이미 하셨습니다.");
//   } else {
//     console.log("수강신청 페이지로 이동");
//   }
// };
