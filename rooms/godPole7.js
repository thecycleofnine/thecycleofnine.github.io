const godPole7 = {
    id: 'godPole7',
    name: `Seventh wooden pole`,
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
        { dir: 'southeast', id: 'godPole6' },
        { dir: 'northeast', id: 'godPOle8' },
        { dir: 'north', id: 'fisherVillageSquare' },
        { dir: 'east', id: 'fisherVillageAltar' },
    ]
}