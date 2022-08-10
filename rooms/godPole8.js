const godPole8 = {
    id: 'godPole8',
    name: `Eighth wooden pole`,
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
        { dir: 'southwest', id: 'godPole7' },
        { dir: 'northeast', id: 'godPole1' },
        { dir: 'north', id: 'fisherVillageSquare' },
        { dir: 'southeast', id: 'fisherVillageAltar' },
    ]
}