import fs from "fs";

const args = process.argv.slice(2);
const input = fs.readFileSync(args[0]);

const modules = input
  .toString()
  .split(/\r?\n/)
  .filter(Number);

const calcFuel = mass => {
  const fuel = Math.floor(mass / 3) - 2;
  return fuel <= 0 ? 0 : fuel + calcFuel(fuel);
};
const fuelRequired = modules.reduce((total, mass) => total + calcFuel(mass), 0);

console.log(fuelRequired);
