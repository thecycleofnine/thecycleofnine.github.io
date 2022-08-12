const hillside = {
    id: 'hillside',
    area: 'Mountain of beginnings',
    name: `Hillside`,
    desc: `You're on a rocky path. There's a broken down ***carriage***, which is nearly blocking the way.
    The path down ***south*** seems to lead to an old fisher village.
    There's a mountain range to the ***north***.`,
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
            name: 'carriage',
            desc: `It's an abandoned and dilapitated carriage. It's missing a wheel.
            There's a wooden ***chest*** inside.`,
            onSwing: () => println(`The rotten carriage breaks down even further.`),
        }, {
            name: 'chest',
            desc: `It was a perfectly good chest once.`,
            onSwing: () => println(`The rotten wood bends and breaks with a thump.`),
            onOpen: () => {
                println(`The chest opens with a damp squeak. It's empty.`)
            }
        }
    ],
    exits: [
        { dir: 'north', id: 'fieldOfEyesAndEars' },
        { dir: 'south', id: 'fisherVillageGate' }
    ]
}