const randomString = require("./getRandomString");

const fakeCateDB = [
  // { cateID: 1, cateName: "ReactJS", keyLevel: 1 },
  // { cateID: 2, cateName: "Javascript", keyLevel: 1 },
  // { cateID: 3, cateName: "Flutter", keyLevel: 0 },
  // { cateID: 4, cateName: "React Native", keyLevel: 0 },
];

//console.log(randomString(5));

for (let i = 0; i < 12; i++) {
  fakeCateDB.push({
    catID: i,
    catName: randomString(5),
    subjID: Math.random() >= 0.5 ? 1 : 0,
  });
}

module.exports = fakeCateDB;
