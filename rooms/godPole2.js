const godPole2 = {
    id: 'godPole2',
    name: `Second wooden pole`,
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
        { dir: 'northwest', id: 'godPole1' },
        { dir: 'southeast', id: 'godpole3' },
        { dir: 'southwest', id: 'fisherVillageAltar' },
        { dir: 'north', id: 'fisherVillageSquare' },
    ]
}