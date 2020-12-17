const userModal = require("./../models/user.model");

const userController = {
  // get all user
  getAllUsers: async (req, res) => {
    try {
      const users = userModal.getAllUser();
      if (users) {
        return res.status(200).json({
          users: users,
        });
      } else {
        return res.json({
          message: "Cannot find any user!",
        });
      }
    } catch (er) {
      return res.status(500).json({ message: "Internal Server Error!" });
    }
  },
  // login
  getLogin: async (req, res) => {
    res.render("vwUser/Login", {
      layout: "loginout",
    });
  },
  // register
  getRegister: async (req, res) => {
    res.render("vwUser/Register", {
      layout: "loginout",
    });
  },

  // forgot password
  getForgotPassword: (req, res) => {
    res.render("vwUser/ForgotPassword", {
      layout: "loginout",
    });
  },
};

module.exports = userController;
