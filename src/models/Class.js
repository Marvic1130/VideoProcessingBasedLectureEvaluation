//수업명 , 교수, 학과, 수업시간, 장소, 인원수,학점
const Sequelize = require("sequelize");
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        className: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        professor: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        department: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        classTime: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        place: {
          type: Sequelize.STRING(50),
          allowNull: false,
        },
        people: {
          type: Sequelize.INTEGER(50),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Class", // 모델 이름을 설정, 노드 프로젝트에서 사용
        tableName: "class",
        paranoid: false,
        charset: "utf8", //한글을 입력하기 위한 설정
        collate: "utf8_general_ci", //한글을 입력하기 위한 설정
      }
    );
  }

  static associate(db) {
    db.Class.belongsTo(db.Student, { foreignKey: "sClassId", targetKey: "id" });
    db.Class.belongsTo(db.Professor, {
      foreignKey: "pClassId",
      targetKey: "id",
    });
    db.Class.hasOne(db.Evaluation, {
      foreignKey: "CevaluationId",
      targetKey: "id",
    });
  }
};
