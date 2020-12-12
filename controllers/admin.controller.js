const adminModel = require("./../models/admin.model");

const adminController = {
  // get dashboard
  getDashboard: (req, res) => {
    res.render("vwAdminDashboard", {
      layout: "admin",
      headerTitle: "Dashboard",
    });
  },

  // get Categories
  getCategories: (req, res) => {
    res.render("vwAdminCategories", {
      layout: "admin",
      headerTitle: "Categories",
    });
  },

  // fage not found
  getNotfound: (req, res) => {
    res.render("vwAdminNotfound", {
      layout: "admin",
    });
  },
};

module.exports = adminController;
