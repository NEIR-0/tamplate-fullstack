'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
const { sign } = require('../../helpers/jwt');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }

    // method untuk compare password (optional)
    async checkPassword(inputPassword) {
      return await bcrypt.compare(inputPassword, this.password);
    }

    generateToken() {
      const accessToken = sign({ uuid: this.uuid })
      return {
        accessToken
      }
    }
  }

  User.init({
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Email already registered"
      },
      validate: {
        notEmpty: {
          msg: "Email is required"
        },
        isEmail: {
          msg: "Email format is invalid"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Password is required"
        },
        len: {
          args: [8],
          msg: "Password must be at least 8 characters"
        },
        isStrongEnough(value) {
          if (!/[A-Z]/.test(value)) {
            throw new Error("Password must contain at least one uppercase letter");
          }
          if (!/\d/.test(value)) {
            throw new Error("Password must contain at least one number");
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });

  // hash password sebelum create
  User.beforeCreate(async (user) => {
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
  });

  return User;
};