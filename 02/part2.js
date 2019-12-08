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
  for (let opcodeAddr = 0; opcodeAddr < memory.length; opcodeAddr += 4) {
    let [opcode, param1Addr, param2Addr, resultAddr] = memory.slice(
      opcodeAddr,
      opcodeAddr + 4
    );

    if (opcode === 99) break;
    if (!instructions[opcode]) throw `Unknown opcode received: ${opcode}`;

    memory[resultAddr] = instructions[opcode](
      memory[param1Addr],
      memory[param2Addr]
    );
  }

  return memory;
};

const findInput = (initialMemory, expectedOutput) => {
  for (let param1 = 0; param1 <= 99; param1++) {
    for (let param2 = 0; param2 <= 99; param2++) {
      const memory = [...initialMemory];
      memory[1] = param1;
      memory[2] = param2;

      compute(memory);

      if (memory[0] === expectedOutput) {
        return 100 * param1 + param2;
      }
    }
  }
};

console.log(findInput(initialMemory, 19690720));
