const userModal = require("./../models/user.model");
const bcryptjs = require("bcryptjs");
const config = require("./../config/default.json");
const moment = require("moment");

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
    const ref = req.headers.referer;
    req.session.retUrl = ref;

    //console.log(ref);

    res.render("vwUser/Login", {
      layout: "loginout",
    });
  },
  // post login
  postLogin: async (req, res) => {
    const { email, password } = req.body;
    //  console.log(req.body);
    const infor = {
      email: email,
      password: password,
    };
    const isUserExists = await userModal.findUserByEmail(email);

    if (isUserExists.length === 0) {
      return res.status(404).json({ message: "Invalid email or password!" });
    }

    // console.log(isUserExists);
    // neu la admin thi render page admin luon

    if (isUserExists[0].decentralization === 2 && password === "admin") {
      req.session.isAuth = true;
      req.session.authUser = isUserExists[0];

      return res.json({ redirect: "/admin/dashboard" });
    }

    if (isUserExists[0].decentralization === 1 && password === "123") {
      req.session.isAuth = true;
      req.session.authUser = isUserExists[0];

      if (req.session.retUrl === "http://localhost:3000/user/register") {
        return res.json({ redirect: "/" });
      }

      return res.json({ redirect: req.session.retUrl || "/" });
    }

    const comparePassword = bcryptjs.compareSync(
      password,
      isUserExists[0].password
    );

    if (comparePassword === false) {
      return res.status(404).json({ message: "Invalid email or password!" });
    }

    req.session.isAuth = true;
    req.session.authUser = isUserExists[0];

    let url = req.session.retUrl || "/";
    if (req.session.retUrl === `${config.devURL.URL}/user/register`) {
      return res.status(200).json({ redirect: "/" });
    }
    return res.status(200).json({ redirect: url });
  },

  // post logout
  postLogout: async (req, res) => {
    console.log("Logout route!!");

    req.session.isAuth = false;
    req.session.authUser = null;

    let url = req.headers.referer;
    res.redirect(url);
  },
  // register
  getRegister: (req, res) => {
    res.render("vwUser/Register", {
      layout: "loginout",
    });
  },

  // post register
  postRegister: async (req, res) => {
    try {
      console.log("Registering!");
      const { username, email, password, dob } = req.body;
      //  console.log(req.body);

      // check email is available
      const checkEmail = await userModal.isAvailable(email);
      // console.log(checkEmail);

      if (checkEmail.length !== 0) {
        return res.status(404).json({ message: "Email have been used!" });
      }

      // hash password
      const hash = bcryptjs.hashSync(password, 10);
      //  console.log(hash);

      // format date - yyyy-mth-day
      const dobFormated = moment(dob, "DD/MM/YYYY").format("YYYY-MM-DD");

      const user = {
        userName: username,
        email,
        password: hash,
        DOB: dobFormated,
        decentralization: 0,
      };

      const result = await userModal.addUser(user);
      // console.log(result);

      //console.log(dobFormated);

      res.render("vwUser/Register", {
        layout: "loginout",
      });
    } catch (er) {
      console.log(er);

      return res.status(404).json({ message: er.sqlMessage });
    }
  },

  // forgot password
  getForgotPassword: (req, res) => {
    res.render("vwUser/ForgotPassword", {
      layout: "loginout",
    });
  },

  // get profile
  getProfile: (req, res) => {
    res.render("vwUser/Profile", {
      layout: "main",
    });
  },

  // get upload course page
  getUploadCoursePage: (req, res) => {
    res.render("vwUser/UploadCourse", {
      layout: "main",
    });
  },
};

module.exports = userController;
