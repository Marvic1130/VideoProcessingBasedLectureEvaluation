const express = require("express");
const user = require("../controllers/userController");
const userRouter = express.Router(); //라우터 생성

userRouter.get("/main", user.home);
userRouter.get("/selectSignup", user.selectSignup);
userRouter.get("/selectSignup/studentSignup", user.getSJoin);
userRouter.get("/selectSignup/professorSignup", user.getPJoin);
userRouter
  .route("/lectureEvaluation/:className")
  .get(user.getLectureEvaluation)
  .post(user.postLectureEvaluation);
userRouter.route("/dataPage").get(user.getDataPage).post(user.postDataPage);

userRouter
  .route("/sClass")
  .get(user.getClassStudent)
  .post(user.postClassStudent);
userRouter
  .route("/pClass")
  .get(user.getClassProfessor)
  .post(user.postClassProfessor);

userRouter.route("/sJoin").post(user.postSJoin);
userRouter.route("/pJoin").post(user.postPJoin);

userRouter.route("/").get(user.getLogin).post(user.postLogin);

// export default userRouter;
module.exports = userRouter;
//
