a =
  "run time is 600s 434ms[14.050000000000065, 6.649999999999984, 4.499999999999992, 5.699999999999988, 8.899999999999991, 9.5, 7.699999999999981, 9.299999999999997, 6.5999999999999845, 8.199999999999982, 0.05]!@#$%1, 5, 7, 6, 4, 4, 5, 4, 5, 4, 10";
const stringData = a;
const realData = stringData.substring(stringData.indexOf("%") + 1);
console.log(realData);
const b = [];
console.log(realData.split(", "));
console.log();
