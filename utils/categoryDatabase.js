const randomString = require("./getRandomString");

const fakeCateDB = [
  // { cateID: 1, cateName: "ReactJS", keyLevel: 1 },
  // { cateID: 2, cateName: "Javascript", keyLevel: 1 },
  // { cateID: 3, cateName: "Flutter", keyLevel: 0 },
  // { cateID: 4, cateName: "React Native", keyLevel: 0 },
];

console.log(randomString(5));

for (let i = 0; i < 16; i++) {
  fakeCateDB.push({
    cateID: i,
    cateName: randomString(5),
    keyLevel: Math.random() >= 0.5 ? 1 : 0,
  });
}

module.exports = fakeCateDB;
