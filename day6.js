var fs = require("fs");
const smallInput = `abc

a
b
c

ab
ac

a
a
a
a

b`;

const input1 = fs.readFileSync("day6.txt", "utf8");
const cleanInput = (str) => str.split(/\n{2}/).map((x) => x.split(/\n/));
const sum = (a, c) => (a += parseInt(c));
const day6part1 = (input) =>
  input
    .map((x) => {
      let hash = {};
      x.reduce((a, c) => c.split("").forEach((z) => (a[z] ? (a[z] += 1) : (a[z] = 1)))), {};
      return Object.keys(hash).length;
    })
    .reduce(sum, 0);

const day6part2 = (input) =>
  input
    .map((x) => {
      let hash = {};
      x.map((y) => y.split("").forEach((z) => (hash[z] ? (hash[z] += 1) : (hash[z] = 1))));
      return Object.values(hash).filter((y) => y === x.length).length;
    })
    .reduce(sum, 0);
