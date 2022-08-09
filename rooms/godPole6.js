const godPole6 = {
    id: 'godPole6',
    name: `Sixth wooden pole`,
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
        { dir: 'southeast', id: 'godPole5' },
        { dir: 'northwest', id: 'godPole7' },
        { dir: 'west', id: 'fisherVillageSquare' },
        { dir: 'northeast', id: 'fisherVillageAltar' },
    ]
}