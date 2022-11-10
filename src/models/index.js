const Sequelize = require("sequelize");

// import { Sequelize } from "sequelize";
const env = process.env.NODE_ENV || "development";
const config = require("../../config/config.json")[env];
const Student = require("./Student");
const Professor = require("./Professor");
const Evaluation = require("./Evaluation");

const Class = require("./Class");

// import config from ("../../config/config.json")[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);
const db = {};

db.sequelize = sequelize;
db.Student = Student;
db.Professor = Professor;
db.Class = Class;
db.Evaluation = Evaluation;

Student.init(sequelize);
Professor.init(sequelize);
Class.init(sequelize);
Evaluation.init(sequelize);

Student.associate(db);
Professor.associate(db);
Class.associate(db);
Evaluation.associate(db);

module.exports = db;
// export default db;
