const express = require("express");
const classes = require("../controllers/classController");

const classRouter = express.Router(); //라우터 생성

classRouter.post("/:id([^0-9]/g)/evaluation", classes.evaluation);
//미들웨어 설정
classRouter.route("/register").post(classes.register);
classRouter.get("/find", classes.find);
classRouter.route("/delete").post(classes.delete);

// export default userRouter;

//미들웨어 설정

module.exports = classRouter;
