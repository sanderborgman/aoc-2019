import fs from "fs";

const args = process.argv.slice(2);
const input = fs.readFileSync(args[0]);

const modules = input
  .toString()
  .split(/\r?\n/)
  .filter(Number);

const calcFuel = mass => Math.floor(mass / 3) - 2;
const fuelRequired = modules.reduce((total, mass) => total + calcFuel(mass), 0);

console.log(fuelRequired);
