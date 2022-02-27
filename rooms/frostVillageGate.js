const frostVillageGate = {
    id: 'frostVillageGate',
    name: 'Frost Village gate',
    desc: `You find yourself standing in front of a wall of ice. It's encircling a Giant village. There are impassable mountains behind it.
    There's a small **Frost Giant** on lookout sitting at the edge of the wall above the village ***gate***.`,
    gateOpen: false,
    items: [
      {
        name: 'gate',
        desc: `It's a round gate made of black stone. It's shining. There are big ornament shields hanging on the wall around the gate.`,
        onSwing: () => println(`The ***gate*** repels it with a clang.
        The small **Frost Giant** gives you a puzzled look from the top of the wall.`),
        onEat: () => println(`The small **Frost Giant** seems highly amused by your attempt.`)
      },
      {
        name: 'Flute of Ice',
      },
    ],
    exits: [
      {  dir: 'southwest', id: 'roadToFrostVillage' },
      { dir:'east', id: 'frostVillage', block: 'The ***gate*** to Frost Village is closed.' }
    ]
  }