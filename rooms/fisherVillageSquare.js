const fisherVillageSquare = {
    id: 'fisherVillageSquare',
    name: `Fisher village square`,
    desc: `Large wooden ***poles*** form a circle at the center of the village square.`,
    printDescriptions: true,
    items: [
        {
            name: 'poles',
            desc: `Each pole is skillfully carved into a detailed figure.`,
            onSwing: () => {},
            onEat: () => {},
        }
    ],
    exits: [
        { dir: 'south', id: 'godPole1' },
        { dir: 'southwest', id: 'godPole8' },
        { dir: 'southeast', id: 'godPole2' },
        { dir: 'north', id: 'fisherVillageGate' },
    ]
}