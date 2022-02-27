const fisherVillageGate = {
    id: 'fisherVillageGate',
    name: `Fisher village gate`,
    desc: `You are standing in front of the gate leading to an old fisher village. There's a ***sign*** on the gate.
    A dirt road narrows to the ***east*** leading to a forest.`,
    printDescriptions: true,
    items: [
        {
            name: 'sign',
            desc: `It's a wooden sign nailed to the open village gate.
            It reads "Welcome! - Jötnar beware".`,
            onSwing: () => println(`The rotten carriage breaks down even further.`),
        }
    ],
    exits: [
        { dir: 'north', id: 'hillside' },
        { dir: 'east', id: 'pathToHodrsForest' }
    ]
}