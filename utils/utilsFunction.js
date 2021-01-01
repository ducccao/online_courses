const config = require("./../config/default.json");
const { v4: uuid } = require("uuid");

function averageArrayRating(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; ++i) {
    sum += arr[i]?.rating ? arr[i].rating : 0;
  }
  return (sum / arr.length).toFixed(2);
}

function generateOneTimePasswordURL() {
  const pureURL = config.devURL;
  const OTP_URL = pureURL + `/user/verify/${uuid()}`;
  return OTP_URL;
}

module.exports = {
  averageArrayRating,
  generateOneTimePasswordURL,
};
