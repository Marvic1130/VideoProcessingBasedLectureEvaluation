const Sequelize = require("sequelize");
//
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        q1: {
          type: Sequelize.INTEGER(20),
          allowNull: false,
        },
        q2: {
          type: Sequelize.INTEGER(20),
          allowNull: false,
        },
        q3: {
          type: Sequelize.INTEGER(20),
          allowNull: false,
        },
        q4: {
          type: Sequelize.INTEGER(20),
          allowNull: false,
        },
        q5: {
          type: Sequelize.INTEGER(20),
          allowNull: false,
        },
        q6: {
          type: Sequelize.STRING(255),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "Evaluation", // 모델 이름을 설정, 노드 프로젝트에서 사용
        tableName: "Evaluation",
        paranoid: false,
        charset: "utf8", //한글을 입력하기 위한 설정
        collate: "utf8_general_ci", //한글을 입력하기 위한 설정
      }
    );
  }

  static associate(db) {
    db.Evaluation.belongsTo(db.Class, {
      foreignKey: "CevaluationId",
      sourceKey: "id",
    });
  }
};
