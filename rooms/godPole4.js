const godPole4 = {
    id: 'godPole4',
    name: `Fourth wooden pole`,
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
        { dir: 'northeast', id: 'godPole3' },
        { dir: 'southwest', id: 'godPole5' },
        { dir: 'west', id: 'fisherVillageSquare' },
        { dir: 'northwest', id: 'fisherVillageAltar' },
    ]
}