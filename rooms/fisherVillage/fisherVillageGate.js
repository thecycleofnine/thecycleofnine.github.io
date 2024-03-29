const fisherVillageGate = {
    id: 'fisherVillageGate',
    area: 'Fisher village',
    name: `Fisher village gate`,
    desc: `You are standing in front of the gate of an old fisher village. The gate is open and there's a ***sign*** above the gate.
    A dirt road narrows to the ***east***, leading to a forest.`,
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
            name: 'sign',
            desc: `It reads "Welcome! (Jøtnar beware)"`,
            onSwing: () => println(`An angry old fisher yells at you from the village square: "By the Nine, stop that at once!"`),
            onEat: () => println(`It's too high up!'`)
        }
    ],
    exits: [
        { dir: 'north', id: 'hillside' },
        { dir: 'east', id: 'pathToHodrsForest' },
        { dir: 'south', id: 'fisherVillageSquare' },
    ]
}