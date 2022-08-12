const spiritWorld1 = {
    id: 'spiritWorld1', // unique ID for this room
    name: 'Altered State of Mind', // room name (shown when player enters the room)                                                                          
    // room description (shown when player first enters the room)
    desc: `You are surrounded by a warm darkness.
    It's mushy and comfortable.`,
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
        }
    ],
    exits: [
        { dir: 'north', id: 'spiritWorld2' },
        { dir: 'east', id: 'spiritWorld2' },
        { dir: 'south', id: 'spiritWorld2' },
        { dir: 'west', id: 'spiritWorld2' },
        { dir: 'east', id: 'spiritWorld2' },
        { dir: 'northeast', id: 'spiritWorld2' },
        { dir: 'southeast', id: 'spiritWorld2' },
        { dir: 'southwest', id: 'spiritWorld2' },
        { dir: 'northwest', id: 'spiritWorld2' },
    ],
}