const godPole5 = {
    id: 'godPole5',
    name: `Fifth wooden pole`,
    desc: `TBA`,
    printDescriptions: true,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`TBAopen`)
        } else {
            println(`TBAclosed`)
        }
    },
    items: [
        {
            name: 'pole',
            onSwing: () => println(`TBA`),
            onEat: () => println(`TBA`),
        }
    ],
    exits: [
        { dir: 'northeast', id: 'godPole4' },
        { dir: 'northwest', id: 'godPole6' },
        { dir: 'south', id: 'fisherVillageAltar' },
        { dir: 'west', id: 'fisherVillageSquare' },
        { dir: 'east', id: 'fisherVillageSquare' },
    ]
}