const adminModel = require("./../models/admin.model");
const usersDatabase = require("./../utils/usersDatabase");
const categoryModel = require("./../models/category.model");
const fakeCateDB = require("./../utils/categoryDatabase");
const config = require("./../config/default.json");

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
    const mobileCate = fakeCateDB.filter((cate) => {
      return cate.keyLevel === 0;
    });
    const webCate = fakeCateDB.filter((cate) => {
      return cate.keyLevel === 1;
    });

    // pagi
    const cateID = +req.params.id;

    //console.log(req.params);

    for (const c of res.locals.lcCategories) {
      if (c.cateID === cateID) {
        c.isActive = true;
      }
    }

    const page = +req.query.page;

    //console.log(req.query);
    //console.log(typeof page);

    //  console.log("page: ", page);
    if (page < 0) {
      page = 1;
    }

    const limitProductInApage = config.pagination.limit;

    const offset = (page - 1) * limitProductInApage;

    // const [rows, total] = await Promise.all([
    //   adminModel.pagiCate(cateID, offset),
    //   adminModel.countProductInCate(cateID)
    // ]);

    const [rows, total] = await Promise.all([1, 25]);

    const nPage = Math.ceil(total / limitProductInApage);

    //console.log(nPage);

    const pagiItem = [];

    for (let i = 1; i <= nPage; i++) {
      // console.log("page =", page, " i =", i);
      const item = {
        value: i,
        isActive: page === i,
      };
      // console.log(item.isActive);
      pagiItem.push(item);
    }

    //console.log(pagiItem);
    // console.log(page < nPage);
    // console.log(nPage);

    res.render("vwAdminCategories", {
      layout: "admin",
      headerTitle: "Categories",
      userName: user.userName,
      mobileCate: mobileCate,
      webCate: webCate,
      categories: fakeCateDB,
      empty: fakeCateDB.length === 0,
      //
      pagiItem: pagiItem,
      can_go_prev: page > 1,
      can_go_next: page < nPage,
    });
  },

  // get cate by id
  getCateByID: async (req, res) => {
    res.end("404");
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
