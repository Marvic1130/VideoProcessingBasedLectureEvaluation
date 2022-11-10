const express = require("express");
const user = require("../controllers/userController");
const passport = require("../passport/index");

// import express from "express";
// import { home } from "../controlers/userControler.js";
const userRouter = express.Router(); //라우터 생성

userRouter.get("/main", user.home);
userRouter.post("/sJoin", user.studentJoin);
userRouter.post("/pJoin", user.professorJoin);
userRouter.get("/", user.getLogin);
userRouter.post("/", user.login);

// export default userRouter;
module.exports = userRouter;
