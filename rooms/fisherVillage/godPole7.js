const godPole7 = {
    id: 'godPole7',
    area: 'Fisher village',
    name: `Seventh wooden pole`,
    desc: `The carving depicts a fertility god of godly dimensions. There's a ***pole*** within the pole, and everything there needs to be.
    The god is holding a sharp ***antler***, and is accompanied by a ***boar***.`,
    printDescriptions: true,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`You feel the fair weather caressing you.`)
        } else {
            println(`You feel blessed rains approaching. The land is flourishing.`)
        }
    },
    items: [
        {
            name: 'pole',
            desc: `It is majestetic. It is godly. It is everything it needs to be.`,
            onSwing: () => println(`The mighty ***pole*** parries the swing playfully.`),
            onEat: () => println(`By the master of Boar, the Golden mane,
                                may thou be blessed with fertile rain.`)
        },
        {
            name: 'antler',
            desc: `It seems to be a replacement for a sword once bargained away.`,
            onSwing: () => println(`It can take a hit!`),
            onEat: () => println(`You try to munch on the ***antler***. 
            But it's too sharp!`),
        },
        {
            name: 'boar',
            desc: `The boar has golden bristles in its mane. They glow in the dark.`,
            onSwing: () => println(`The ***antler*** shifts to block the blow.`),
            onEat: () => println(`You try to take a bite out of the ***boar***, but the ***antler*** shifts to protect it.`),
        }
    ],
    exits: [
        { dir: 'southeast', id: 'godPole6' },
        { dir: 'northeast', id: 'godPole8' },
        { dir: 'north', id: 'fisherVillageSquare' },
        { dir: 'east', id: 'fisherVillageAltar' },
    ]
}