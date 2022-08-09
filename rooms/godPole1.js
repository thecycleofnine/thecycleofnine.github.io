const godPole1 = {
    id: 'godPole1',
    name: `First wooden pole`,
    desc: `TBA`,
    printDescriptions: true,
    items: [
        {
            name: 'pole',
            onSwing: () => println(`TBA`),
            onEat: () => println(`TBA`),
        }
    ],
    exits: [
        { dir: 'southeast', id: 'godPole2' },
        { dir: 'southwest', id: 'godPole8' },
        { dir: 'south', id: 'fisherVillageAltar' },
        { dir: 'north', id: 'fisherVillageSquare' },
    ]
}