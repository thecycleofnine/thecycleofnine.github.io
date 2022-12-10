const frostVillageGate = {
    id: 'frostVillageGate',
    area: 'Frost village',
    name: 'Frost village gate',
    desc: `You find yourself standing in front of a thick wall of ice. It's encircling a Giant village. The ice wall merges into an unpassable mountain range behind the village.
    There's a small **Frost Giant** on lookout, sitting at the edge of the wall above the village ***gate***.`,
    gateOpen: false,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`TBAopen`)
        } else {
            println(`TBAclosed`)
        }
    },
    items: [
        {
            name: 'gate',
            desc: `It's a round gate made of glistening black stone. There are big ornament shields made of ice hanging on the wall around the gate.`,
            onSwing: () => println(`The ***gate*** repels it with a clang.
            The small **Frost Giant** gives you a puzzled look from the top of the wall.`),
            onEat: () => println(`The small **Frost Giant** seems mildly amused by your attempt.`)
        },
        {
            name: 'Flute of Ice',
        },
    ],
    exits: [
        { dir: 'southwest', id: 'roadToFrostVillage' },
        { dir: 'east', id: 'frostVillage', block: 'The ***gate*** to Frost Village is closed.' }
    ]
}