const { Op } = require("sequelize");
const Class = require("../models/Class");
const Student = require("../models/Student");
const Professor = require("../models/Professor");
const axios = require("axios");

module.exports.register = async (req, res) => {
  console.log(req.user);
  const { id } = req.user;
  const { className, professor, department, classTime, place, people } =
    req.body;

  try {
    await Class.create({
      className,
      professor,
      department,
      classTime,
      place,
      people,
      classId: id,
    });
    return res.redirect("/pClass");
  } catch (err) {
    console.log(err);
  }
};

module.exports.find = async (req, res) => {
  //ui 변경 요청하기!!!!!
  const { keyword } = req.query;
  try {
    const item = await Class.findAll({
      where: {
        [Op.or]: [
          {
            className: {
              [Op.like]: `%${keyword}%`,
            },
          },
          {
            professor: {
              [Op.like]: `%${keyword}%`,
            },
          },
        ],
      },
    });
    return res.json(item);
    // if (item.length === 0) {
    //   return res.status(401).json({ message: "일치하는 수업이 없습니다!" });
    // }
  } catch (error) {
    console.log(error);
  }
};

module.exports.evaluation = async (req, res) => {
  const { q1, q2, q3, q4, q5, q6 } = req.body;
  // const { id } = req.user;
  // console.log(id);

  try {
    await Class.create({});
    return res
      .json({ className, professor, department, classTime, place, people })
      .redirect("/");
  } catch (err) {
    console.log(err);
  }
};

module.exports.delete = async (req, res) => {
  const { hiddenValue } = req.body;
  const { id } = req.user;
  const professor = await Professor.findOne({ where: { id } });
  const student = await Student.findOne({ where: { id } });

  try {
    if (professor) {
      await Class.destroy({ where: { className: hiddenValue } });
      return res.redirect("/pClass");
    } else if (student) {
      await Class.destroy({ where: { className: hiddenValue } });
      return res.redirect("/sClass");
    }
  } catch (err) {
    console.log(err);
  }
};
