const randomstring = require("randomstring");

function randomString(length) {
  return randomstring.generate(length);
}

module.exports = randomString;
