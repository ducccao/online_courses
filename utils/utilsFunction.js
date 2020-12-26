function averageArrayRating(arr) {
  let sum = 0;
  for (let i = 0; i < arr.length; ++i) {
    sum += arr[i]?.rating ? arr[i].rating : 0;
  }
  return (sum / arr.length).toFixed(2);
}

module.exports = {
  averageArrayRating,
};
