const adminModel = require("./../models/admin.model");
const usersDatabase = require("./../utils/usersDatabase");

const fakeCateDB = require("./../utils/categoryDatabase");
const courseModel = require("./../models/course.model");
const config = require("./../config/default.json");

const user = usersDatabase[0];

const adminController = {
    /* #region  CATEGORY */
    // get dashboard
    getDashboard: (req, res) => {
        res.render("vwAdmin/Dashboard", {
            layout: "admin",
            headerTitle: "Dashboard",
            userName: user.userName,
        });
    },

    // get all Categories
    getAllCategories: async(req, res) => {
        const mobileCate = fakeCateDB.filter((cate) => {
            return cate.keyLevel === 0;
        });
        const webCate = fakeCateDB.filter((cate) => {
            return cate.keyLevel === 1;
        });

        const allCate = await adminModel.getAllCategory();
        // console.log(allCate);

        // pagi
        const cateID = +req.params.id;

        //console.log(req.params);

        for (const c of res.locals.lcCategories) {
            if (c.cateID === cateID) {
                c.isActive = true;
            }
        }

        let page = +req.query.page || 1;

        //console.log(req.query);
        //console.log(typeof page);

        //  console.log("page: ", page);
        if (page < 0) {
            page = 1;
        }

        const limitProductInApage = config.pagination.limit;

        const offset = (page - 1) * limitProductInApage;

        // const [rows, total] = await Promise.all([
        //   adminModel.pagiCate(offset),
        //   adminModel.countCoursetInCate(cateID),
        // ]);

        const rows = await adminModel.pagiCate(offset);
        const total = allCate.length;

        // const [rows, total] = await Promise.all([1, 25]);

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

        res.render("vwAdmin/Category", {
            layout: "admin",
            headerTitle: "Categories",
            //  userName: user.userName,
            mobileCate: mobileCate,
            webCate: webCate,
            categories: rows,
            // categories: fakeCateDB,
            empty: fakeCateDB.length === 0,
            showPagi: allCate.length >= 12,

            //
            pagiItem: pagiItem,
            can_go_prev: page > 1,
            can_go_next: page < nPage,
            go_next_page: page + 1,
            go_previous_page: page - 1,
        });
    },

    // fage not found
    getNotfound: (req, res) => {
        res.render("vwAdmin/NotFound", {
            layout: "admin",
            userName: user.userName,
        });
    },

    // get add cate page
    getAddCatePage: (req, res) => {
        console.log("Add cate page");
        res.render("vwAdmin/AddCategory", {
            layout: "admin",
            headerTitle: "Add Category",
            userName: user.userName,
        });
    },

    // add cate
    addCate: async(req, res) => {
        console.log("adding new category!");
        const allCate = await adminModel.getAllCategory();

        console.log(req.body);
        const { catName, subjID } = req.body;
        // check name
        let errName = false;
        allCate.forEach((cat) => {
            if (cat.catName === catName) {
                errName = true;
            }
        });

        if (errName) {
            res.status(404).json({ message: "Category has been exists!" });
            return;
        }

        const newCate = {
            ...req.body,
            catID: allCate.length + 1,
        };

        const rs = await adminModel.addCate(newCate);

        // console.log(rs);
        res.render("vwAdmin/AddCategory", {
            layout: "admin",
            userName: user.userName,
        });
    },

    // get edit cate page
    getEditCatePage: (req, res) => {
        console.log("Edit cate page");
        res.render("vwAdmin/EditCategory", {
            layout: "admin",
            headerTitle: "Edit Category",
            userName: user.userName,
        });
    },

    // edit cate
    editCate: async(req, res) => {
        console.log("Editing cate!");
        const { catID, catName, subjID } = req.body;

        console.log(req.body);

        const catByID = await adminModel.getCateByID(catID);

        if (catByID.length === 0) {
            return res.status(404).json({ message: "Category does not exists!" });
        }
        const entity = {
            catID: catID,
            catName: catName,
            subjID: subjID,
        };
        const editCat = await adminModel.editCate(entity);

        //  console.log(editCat);
        if (editCat.affectedRows === 1) {
            res.render("vwAdmin/EditCategory", {
                layout: "admin",
                headerTitle: "Edit Category",
                userName: user.userName,
            });
            return;
        }

        return res.status(404).json({ message: "Something when wrong!" });
    },

    // get del cate page
    getDelCatePage: (req, res) => {
        console.log("Del cate page");
        res.render("vwAdmin/DeleteCategory", {
            layout: "admin",
            headerTitle: "Delete Category",
            //userName: user.userName,
        });
    },

    // del cate
    delCate: async(req, res) => {
        console.log("Deleting cate!");
        const { catID } = req.body;
        const catByID = await adminModel.getCateByID(catID);
        const countCouse = await adminModel.countCoursetInCate(catID);

        if (countCouse !== 0) {
            return res
                .status(404)
                .json({ message: "Cannot delete category that contains course!" });
        }

        console.log(req.body);

        if (catByID.length === 0) {
            return res.status(404).json({ message: "Category does not exists!" });
        }

        const entity = {
            catID: catID,
        };
        // check del cat is del ?
        const delCat = await adminModel.delCate(entity);

        if (delCat.affectedRows === 1) {
            res.status(200);
            res.render("vwAdmin/DeleteCategory", {
                layout: "admin",
                headerTitle: "Delete Category",
                userName: user.userName,
            });
            return;
        }

        return res.status(404).json({ message: "Something when wrong!" });
    },

    // get cate by id
    getDetailCat: async(req, res) => {
        const catID = +req.params.id;
        const couseCount = await adminModel.countCoursetInCate(catID);
        //  console.log(couseCount);
        const catByID = await adminModel.getCateByID(catID);
        // console.log(catByID);
        const courseDetail = await adminModel.getCourseDetail(catID);

        // console.log(courseDetail);

        // console.log(req.params);

        res.render("vwAdmin/DetailCategory", {
            layout: "admin",
            headerTitle: "Detail Category",
            userName: user.userName,
            couseCount: couseCount,
            categories: catByID[0],
            courseDetail: courseDetail,
        });
    },
    /* #endregion */

    getAllStudentPage: async(req, res) => {
        console.log("Admin Student All Page");
        const ret1 = await adminModel.getRecordStudent();
        console.log(ret1);

        if (!ret1) {
            return res.status(500).json({ message: "Cannot get records student!" });
        }

        res.render("vwAdmin/vwStudent/All", {
            layout: "admin",
            records: ret1,
            showPagi: true,
        });
    },

    getAddStudentPage: (req, res) => {
        res.render("vwAdmin/vwStudent/Add", {
            layout: "admin",
        });
    },

    postStudent: (req, res) => {},
    getPutStudentPage: (req, res) => {
        res.render("vwAdmin/vwStudent/Put", {
            layout: "admin",
        });
    },
    PutStudent: (req, res) => {},
    getDeleteStudentPage: (req, res) => {
        res.render("vwAdmin/vwStudent/Delete", {
            layout: "admin",
        });
    },

    deleteStudent: (req, res) => {},

    getAllInstructorRecordPage: async(req, res) => {
        const ret1 = await adminModel.getRecordInstructor();
        res.render("vwAdmin/vwInstructor/All", {
            layout: "admin",
            records: ret1,
            showPagi: true,
        });
    },

    getLockAccountInstructorPage: (req, res) => {
        res.render("vwAdmin/vwInstructor/LockAccount", {
            layout: "admin",
        });
    },
    putLockAccountInstructor: async(req, res) => {
        console.log(req.body);
        const userID = req.body.userID;

        const ret1 = await adminModel.lockAccountInstructor(userID);
        console.log(ret1);
        if (+ret1.affectedRows === 0) {
            return res.status(500).json({ sqlMessage: "Cannot Find Instructor!" });
        }
        return res.status(200).json({ sqlMessage: "Locked Find Instructor!" });
    },
};

module.exports = adminController;