const godPole7 = {
    id: 'godPole7',
    area: 'Fisher village',
    name: `Seventh wooden pole`,
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
        { dir: 'southeast', id: 'godPole6' },
        { dir: 'northeast', id: 'godPOle8' },
        { dir: 'north', id: 'fisherVillageSquare' },
        { dir: 'east', id: 'fisherVillageAltar' },
    ]
}