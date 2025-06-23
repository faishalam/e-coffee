const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static async register(req, res) {
    try {
      const { username, email, password, imgUrl, phoneNumber } = req.body;
      const checkEmail = await User.findOne({ where: { email } });
      if (checkEmail)
        return res.status(400).json({ message: "Email already registered" });
      const checkUsername = await User.findOne({ where: { username } });
      if (checkUsername)
        return res.status(400).json({ message: "Username already registered" });
      const newUser = await User.create({
        username,
        email,
        password,
        imgUrl,
        phoneNumber,
      });
      res.status(201).json({
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
        role: newUser.role,
      });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      let findUser = await User.findOne({ where: { email } });
      if (!findUser)
        return res.status(401).json({ message: "Invalid email/password" });
      let checkPassword = comparePassword(password, findUser.password);
      if (!checkPassword)
        return res.status(401).json({ message: "Invalid email/password" });

      let access_token = signToken({ id: findUser.id, email: findUser.email });

      res.status(200).json({ access_token: access_token, role: findUser.role });
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(400).json({ message: error.errors[0].message });
      }
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getProfile(req, res) {
    try {
      const { id } = req.user;
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async getProfileById(req, res) {
    try {
      const { id } = req.params;
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
      if (!user) return res.status(404).json({ message: "User not found" });
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }

  static async updateUser(req, res) {
    try {
      const {
        oldPassword,
        newPassword,
        confirmNewPassword,
        imgUrl,
        phoneNumber,
      } = req.body;
      const { id } = req.user;
      const user = await User.findByPk(id);
      if (!user) return res.status(404).json({ message: "User not found" });
      if (oldPassword || newPassword || confirmNewPassword) {
        const isValid = comparePassword(oldPassword, user.password);
        if (!isValid)
          return res.status(401).json({ message: "Old password is incorrect" });
        if (newPassword !== confirmNewPassword) {
          return res
            .status(400)
            .json({ message: "New password confirmation does not match" });
        }
      }
      const updatedFields = {};
      if (newPassword) updatedFields.password = newPassword;
      if (imgUrl) updatedFields.imgUrl = imgUrl;
      if (phoneNumber) updatedFields.phoneNumber = phoneNumber;
      await User.update(updatedFields, {
        where: { id },
        individualHooks: true,
      });
      const updatedUser = await User.findByPk(id, {
        attributes: { exclude: ["password"] },
      });
      res.status(200).json({
        message: "User updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

module.exports = UserController;
