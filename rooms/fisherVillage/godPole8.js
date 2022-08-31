const godPole8 = {
    id: 'godPole8',
    area: 'Fisher village',
    name: `Eighth wooden pole`,
    desc: `The carving depicts a stern goddess. Half of her face is scorched black and the other white as a skull. There's eerie beauty in her.`,
    printDescriptions: true,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`The air is heavy with inevitability.`)
        } else {
            println(`You feel the inevitability of death as your appointed death-day approaches.
            Do you need something to be ready for it?`)
        }
    },
    exits: [
        { dir: 'southwest', id: 'godPole7' },
        { dir: 'northeast', id: 'godPole1' },
        { dir: 'north', id: 'fisherVillageSquare' },
        { dir: 'southeast', id: 'fisherVillageAltar' },
    ]
}