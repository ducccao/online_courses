const adminModel = require("./../models/admin.model");
const usersDatabase = require("./../utils/usersDatabase");
const categoryModel = require("./../models/category.model");
const fakeCateDB = require("./../utils/categoryDatabase");

const user = usersDatabase[0];

const adminController = {
  // get dashboard
  getDashboard: (req, res) => {
    res.render("vwAdminDashboard", {
      layout: "admin",
      headerTitle: "Dashboard",
      userName: user.userName,
    });
  },

  // get Categories
  getCategories: async (req, res) => {
    const rows = await categoryModel.all();

    const mobileCate = fakeCateDB.filter((cate) => {
      return cate.keyLevel === 0;
    });
    const webCate = fakeCateDB.filter((cate) => {
      return cate.keyLevel === 1;
    });

    res.render("vwAdminCategories", {
      layout: "admin",
      headerTitle: "Categories",
      userName: user.userName,
      mobileCate: mobileCate,
      webCate: webCate,
      categories: fakeCateDB,
      empty: fakeCateDB.length === 0,
    });
  },

  // fage not found
  getNotfound: (req, res) => {
    res.render("vwAdminNotfound", {
      layout: "admin",
      userName: user.userName,
    });
  },
};

module.exports = adminController;
