const express = require("express");
const {
  sClass,
  pClass,
  selectSignup,
  getSJoin,
  postSJoin,
  getPJoin,
  postPJoin,
  getLogin,
  postLogin,
} = require("../controllers/userController");
const userRouter = express.Router(); //라우터 생성

userRouter.get("/pClass", pClass);
userRouter.get("/sClass", sClass);

userRouter.get("/selectSignup", selectSignup);
userRouter.get("/selectSignup/studentSignup", getSJoin);
userRouter.get("/selectSignup/professorSignup", getPJoin);

userRouter.route("/sJoin").post(postSJoin);
userRouter.route("/pJoin").post(postPJoin);

userRouter.route("/").get(getLogin).post(postLogin);

// export default userRouter;
module.exports = userRouter;
