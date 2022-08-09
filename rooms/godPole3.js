const godPole3 = {
    id: 'godPole3',
    name: `Third wooden pole`,
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
        { dir: 'northwest', id: 'godPole2' },
        { dir: 'southwest', id: 'godPole4' },
        { dir: 'west', id: 'fisherVillageAltar' },
        { dir: 'north', id: 'fisherVillageSquare' },
    ]
}