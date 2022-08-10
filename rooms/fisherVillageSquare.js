const fisherVillageSquare = {
    id: 'fisherVillageSquare',
    name: `Fisher village square`,
    desc: `Tall wooden ***poles*** form a circle at the center of the village square.
    The closest pole is to the ***south***.`,
    printDescriptions: true,
    items: [
        {
            name: 'poles',
            desc: `Each pole is skillfully carved into a detailed figure.`,
            onSwing: () => println(`But they are too far away!`),
            onEat: () => println(`The poles are too far away!`),
        }
    ],
    exits: [
        { dir: 'south', id: 'godPole1' },
        { dir: 'southwest', id: 'godPole8' },
        { dir: 'southeast', id: 'godPole2' },
        { dir: 'north', id: 'fisherVillageGate' },
    ]
}