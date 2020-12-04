var fs = require("fs");
let valid = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const day4part1 = (input) => {
  let result = input.split(/\n\n/).map((x) => {
    let res = x
      .split(/\s/)
      .map((y) => y.split(":"))
      .map((y) => y[0])
      .filter((y) => y !== "cid");
    return JSON.stringify(res.sort()) === JSON.stringify(valid.sort());
  });
  return result.filter((x) => x);
};

// console.log(day4part1(fs.readFileSync("day4.txt", "utf8")).length);
let validRegex = /\bbyr|\biyr|\beyr|\bhgt|\bhcl|\becl|\bpid/;

const invalidPass1 = `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926
`;
const invalidPass = `eyr:1972 cid:100
hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926

iyr:2019
hcl:#602927 eyr:1967 hgt:170cm
ecl:grn pid:012533040 byr:1946

hcl:dab227 iyr:2012
ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277

hgt:59cm ecl:zzz
eyr:2038 hcl:74454a iyr:2023
pid:3556412378 byr:2007

iyr:2010 hgt:158cm hcl:#b6652f ecl:blu byr:1944 eyr:2021 pid:093154719`;
const validPass1 = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f`;
const validPass = `pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
hcl:#623a2f

eyr:2029 ecl:blu cid:129 byr:1989
iyr:2014 pid:896056539 hcl:#a97842 hgt:165cm

hcl:#888785
hgt:164cm byr:2001 iyr:2015 cid:88
pid:545766238 ecl:hzl
eyr:2022

iyr:2010 hgt:158cm hcl:#b6652a ecl:blu byr:1944 eyr:2021 pid:093154719`;
const day4part2 = (input) => {
  let result = input.split(/\n\n/).map((x) => {
    let res = x
      .split(/\s/)
      .map((y) => y.split(":"))
      .filter((y) => y[0] !== "cid" && y[0] !== "")
      .map((y) => {
        let key = y[0];
        let value = y[1];
        if (key === "byr") {
          return value.length === 4 && value >= 1920 && value <= 2002;
        } else if (key === "iyr") {
          return value.length === 4 && value >= 2010 && value <= 2020;
        } else if (key === "eyr") {
          return value.length === 4 && value >= 2020 && value <= 2030;
        } else if (key === "hgt") {
          let [num, char, _] = value.split(/([a-z]+)/);
          return char === "cm" ? num >= 150 && num <= 193 : char === "in" ? num >= 59 && num <= 76 : false;
        } else if (key === "hcl") {
          let [hash, num] = value.split("#");
          return num && num.length === 6 && /^[a-f0-9]*$/.test(num);
        } else if (key === "ecl") {
          return (
            value === "amb" ||
            value === "blu" ||
            value === "brn" ||
            value === "gry" ||
            value === "grn" ||
            value === "hzl" ||
            value === "oth"
          );
        } else if (key === "pid") {
          return value.length === 9 && typeof +value === "number";
        } else {
          return false;
        }
      });
    return res;
  });
  return result.filter((x) => x.every((y) => y === true) && x.length === 7);
};
console.dir(day4part2(fs.readFileSync("day4.txt", "utf8")).length, { maxArrayLength: null });
