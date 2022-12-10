const fisherVillageAltar = {
    id: 'fisherVillageAltar',
    area: 'Fisher village',
    name: 'Fisher village altar',
    desc: `You are standing before a wooden ***pole*** three times your height. It's carved from a thick ash tree. There's an ***altar*** at the base.`,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`You feel an immensely overwhelming presence, like you have never felt before.`)
        } else {
            println(`TBAclosed`)
        }
    },
    items: [
        {
            id: 'pole',
            name: 'Wooden statue',
            desc: `The carved figure has a staff, cloak, and a long hat. It stares into your very being with a single eye.`,
            onSwing: () => {
                println(`An enormous spear flies straight through you and into the ground behind you.`)
                toValhall({ name: ['Gungnir'] })
            },
            onEat: () => {
                println(`An enormous spear flies straight through you and into the ground behind you.`)
                toValhall({ name: ['Gungnir'] })
            },
        },
        {
            id: 'altar',
            name: 'Altar',
            desc: `It's a small altar carved inside the ash tree. There's some incence and a bowl of ***mushrooms*** on it.`,
            onSwing: () => {
                println(`It gives out a long vibration, like a bell. The sturdy bowl doesn't break.`)
            },
        },
        {
            id: 'mushrooms',
            name: 'Mushrooms',
            desc: `They seem wise.`,
            isTakeable: true,
            onSwing: () => {
                println(`They get chopped to pieces for easy consumption.`)
            },
            onEat: () => {
                println(`You munch on the mushrooms.`)
                enterRoom('spiritWorld1')
            }
        }
    ],
    exits: [
        { dir: 'north', id: 'godPole1' },
        { dir: 'northeast', id: 'godPole2' },
        { dir: 'east', id: 'godPole3' },
        { dir: 'southeast', id: 'godPole4' },
        { dir: 'south', id: 'godPole5' },
        { dir: 'southwest', id: 'godPole6' },
        { dir: 'west', id: 'godPole7' },
        { dir: 'northwest', id: 'godPole8' },
    ],
}