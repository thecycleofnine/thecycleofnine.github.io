const spiritWorld5 = {
    id: 'spiritWorld5', // unique ID for this room
    name: 'Altered State of Mind', // room name (shown when player enters the room)                                                                          
    // room description (shown when player first enters the room)
    desc: `A particular thread is vowen by **The Three**.
    Ask we might of what's to come?
    Or maybe what is presently coming into being?`,
    onFeel: () => {
        if (player.eyesAreOpen) {
            if (getItemInInventory('Henki')) {
                println(`It's all mushy around you.
            Everything is alive and in constant motion.`)
            } else {
                println(`You are a disembodied conciousness.
            There are multiple presences floating around here.`)
            }
        } else {
            println(`TBAclosed`)
        }
    },
    items: [
        {
            id: 'Henki',
            name: 'Henki',
            desc: `It is a formless spirit. A life force. It pihises.`,
            onSwing: () => {
                println(`The henki swirls and joins the axe. The henki is swinging the axe.`)
            },
            onEat: () => println(`Why eat something that is already you?`)
        },
        {
            id: 'web',
            name: 'web',
            desc: `It's a web woven by **The Three**. It has everything in it.`,
            onSwing: () => {
                println(`Such an act will not be woven.`)
            },
            onEat: () => {
                println(`Such an act will not be woven.`)
            },
        }
    ],
    exits: [
        {
            dir: 'north', id: 'fisherVillageAltar', block: `There are questions to be asked here.
      There are questions to be answered here.`},
        {
            dir: 'east', id: 'fisherVillageAltar', block: `There are questions to be asked here.
      There are questions to be answered here.`},
        {
            dir: 'south', id: 'fisherVillageAltar', block: `There are questions to be asked here.
      There are questions to be answered here.`},
        {
            dir: 'west', id: 'fisherVillageAltar', block: `There are questions to be asked here.
      There are questions to be answered here.`},
        {
            dir: 'northeast', id: 'fisherVillageAltar', block: `There are questions to be asked here.
      There are questions to be answered here.`},
        {
            dir: 'southeast', id: 'fisherVillageAltar', block: `There are questions to be asked here.
      There are questions to be answered here.`},
        {
            dir: 'southwest', id: 'fisherVillageAltar', block: `There are questions to be asked here.
      There are questions to be answered here.`},
        {
            dir: 'northwest', id: 'fisherVillageAltar', block: `There are questions to be asked here.
      There are questions to be answered here.`},
    ],
}