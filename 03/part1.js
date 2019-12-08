import fs from "fs";

const args = process.argv.slice(2);
const input = fs.readFileSync(args[0]);

const wires = input.toString().split(/\r?\n/);

const mapWirePath = wire => {
  let path = wire.split(",");
  let map = new Map(),
    position = { X: 0, Y: 0 };

  path.forEach(step => {
    const direction = step[0];
    const distance = step.substr(1);

    for (let i = 0; i < distance; i++) {
      switch (direction) {
        case "U":
          position.Y++;
          break;
        case "D":
          position.Y--;
          break;
        case "L":
          position.X--;
          break;
        case "R":
          position.X++;
          break;
      }
      map.set(`${position.X},${position.Y}`, [position.X, position.Y]);
    }
  });

  return map;
};

const wire1Map = mapWirePath(wires[0]);
const wire2Map = mapWirePath(wires[1]);

const intersections = Array.from(wire1Map.keys()).filter(position =>
  wire2Map.has(position)
);
const distances = intersections
  .map(position => wire1Map.get(position))
  .map(position => Math.abs(position[0]) + Math.abs(position[1]))
  .sort((a, b) => a - b);

console.log(distances[0]);
