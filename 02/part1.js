import fs from "fs";

const args = process.argv.slice(2);
const input = fs.readFileSync(args[0]);

const initialMemory = input
  .toString()
  .split(",")
  .map(Number);

const instructions = {
  1: (a, b) => a + b,
  2: (a, b) => a * b
};

const compute = memory => {
  for (let opcodePos = 0; opcodePos < memory.length; opcodePos += 4) {
    let [opcode, arg1Pos, arg2Pos, resultPos] = memory.slice(
      opcodePos,
      opcodePos + 4
    );

    if (opcode === 99) break;
    if (!instructions[opcode]) throw `Unknown opcode received: ${opcode}`;

    memory[resultPos] = instructions[opcode](memory[arg1Pos], memory[arg2Pos]);
  }

  return memory;
};

const memory = [...initialMemory];
memory[1] = 12;
memory[2] = 2;

compute(memory);

console.log(memory.join(","));
