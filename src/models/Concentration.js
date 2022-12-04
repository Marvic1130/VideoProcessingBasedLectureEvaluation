const Sequelize = require("sequelize");
//
module.exports = class User extends Sequelize.Model {
  static init(sequelize) {
    return super.init(
      {
        0: {
          type: Sequelize.INTEGER(60),
          allowNull: false,
        },
        1: {
          type: Sequelize.INTEGER(60),
          allowNull: false,
        },
        2: {
          type: Sequelize.INTEGER(60),
          allowNull: false,
        },
        3: {
          type: Sequelize.INTEGER(60),
          allowNull: false,
        },
        4: {
          type: Sequelize.INTEGER(60),
          allowNull: false,
        },
        5: {
          type: Sequelize.INTEGER(60),
          allowNull: false,
        },
        6: {
          type: Sequelize.INTEGER(60),
          allowNull: false,
        },
        7: {
          type: Sequelize.INTEGER(60),
          allowNull: false,
        },
        8: {
          type: Sequelize.INTEGER(60),
          allowNull: false,
        },
        9: {
          type: Sequelize.INTEGER(60),
          allowNull: false,
        },
        10: {
          type: Sequelize.INTEGER(60),
          allowNull: false,
        },
      },
      {
        sequelize,
        timestamps: false,
        underscored: false,
        modelName: "data", // 모델 이름을 설정, 노드 프로젝트에서 사용
        tableName: "data",
        paranoid: false,
        charset: "utf8", //한글을 입력하기 위한 설정
        collate: "utf8_general_ci", //한글을 입력하기 위한 설정
      }
    );
  }

  static associate(db) {}
};
