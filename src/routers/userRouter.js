const express = require("express");
const user = require("../controllers/userController");
const passport = require("passport");

// import express from "express";
// import { home } from "../controlers/userControler.js";
const userRouter = express.Router(); //라우터 생성

userRouter.get("/main", user.home);
userRouter.post("/sJoin", user.studentJoin);
userRouter.post("/pJoin", user.professorJoin);
userRouter.get("/", user.getLogin);
userRouter.post("/login", user.isNotLoggedIn, (req, res, next) => {
  //   passport.authenticate("local", {
  //     successRedirect: "/main",
  //     failureRedirect: "/",
  //   })
  passport.authenticate("local", (authError, user, info) => {
    if (authError) {
      console.error(authError);
      return next(authError);
    }
    if (!user) {
      return res.redirect(`/?loginError=${info.message}`);
    }
    return req.login(user, (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }
      return redirect("/");
    });
  });
  req, res, next;
});
userRouter.get("/lectureEvaluation", user.getLectureEvaluation);
userRouter.get("/classStudent", user.getClassStudent);
userRouter.get("/classProfessor", user.getClassProfessor);
userRouter.get("/selectSignup", user.getSelectSignup);
userRouter.get("/selectSignup/studentSignup", user.getStudentSignup);
userRouter.get("/selectSignup/professorSignup", user.getProfessorSignup);

// export default userRouter;
module.exports = userRouter;
