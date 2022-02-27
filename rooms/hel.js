const hel = {
    id: 'hel',
    name: `Hel`,
    desc: ``,
    printDescriptions: true,
    onEnter: () => {
        const pathToHodrsForest = getRoom('pathToHodrsForest')
        pathToHodrsForest.exits.forEach(e => delete e.block)
        println(`You have lost your ***Henki*** spirit!`)
        const room = getRoom('hel')
        const henki = getItemInInventory('Henki')
        if (henki) disk.inventory = disk.inventory.filter(i => i.name !== 'Henki')
        if (room.printDescriptions) {
            if (roomHistory[roomHistory.length-2] === 'frostVillageWall') {
                println(`You have a faint memory of falling down from a slippery wall in some remote village.
                It doesn't hurt anymore, though.`)
            }
            if (roomHistory[roomHistory.length-2] === 'uphill') {
                println(`You have a faint memory of falling down a steep mountainside.`)
            }
            println(`You realise you are quite dead.`)
        }
        room.printDescriptions = true
    },
    onLook: () => println(`You are in a large hall. It's dark but you're able to see the outlines of a very long ***table***.
    There's a ***throne*** at the other end of the table and someone's sitting in it.`),
    items: [
        {
            name: 'table',
            desc: `It's a very long table. Thousands of pale dead people are feasting at it.
            There's tons of ***salmon*** and ***ale***.
            The dead seem quiet and uninterested by your arrival.`,
            onSwing: () => {
                println(`It makes a sizeable dent to the table.
                No one seems to pay any mind to you however.`)
            }
        },
        {
            name: 'throne',
            desc: `It's entirely made of fingernails. There's a **woman** sitting on it.
            She's looking directly at you, waiting for you to speak.`,
            onSwing: () => {
                println(`**Hel** makes a swift movement with her index finger.
                The ***Fine Axe*** misses the throne and hits the ground instead.`)
            },
            onEat: () => println(`**Hel** looks at you appalled as you try to gnaw the fingernails.`)
        },
        {
            name: 'salmon',
            desc: `It was grilled a long time ago.`,
            onEat: () => println(`The salmon tastes okay but there is no sense of nourishment.`),
            onSwing: () => println(`The salmon cuts in half. It's easier to eat this way.`)
        },
        {
            name: 'ale',
            desc: `It looks full-bodied but stale.`,
            onDrink: () => println(`It tastes okay but there is no sense of delight.`),
            onSwing: () => println(`An ale mug breaks loudly. There's ale everywhere.`)
        }
    ]
}