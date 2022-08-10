const frostVillage = {
    id: 'frostVillage',
    name: 'Frost Village',
    desc: `You are standing in the middle of a Giant village.
    There are Frost Giants of all sizes peeking over small ice ridges and Giant houses. You feel unblinking blue gazes coming from all directions.
    The whole village seems to have halted on your arrival.  
    `,
    onLook: () => {
        const room = getRoom('frostVillage')
        room.desc = ''
        println(`There's a lift mechanism leading up the gate wall to the ***southwest***.
      What is unquestionably the ***Chieftain's house*** is to the ***east***.
      Cobblestone stairs rise to the ***northeast***. There is some kind of a shrine at the top.
      A dark mine looms at the base of the surrounding mountain range to the ***northwest***.
      `)
    },
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`TBAopen`)
        } else {
            println(`TBAclosed`)
        }
    },
    items: [
        {
            name: `The Chieftain's house`,
            desc: `The mighty house is painted bright red. The roof is made from an old galley turned upside down. A huge bonfire has been lit on the roof, it has an eternal feeling to it.`
        }
    ],
    exits: [
        { dir: 'southwest', id: 'frostVillageLift' },
        { dir: 'east', id: 'chieftainsHouseEntrance' },
        { dir: 'northeast', id: 'frostVillageShrine' },
        { dir: 'northwest', id: 'frostVillageMine' },
        { dir: 'west', id: 'frostVillageGate' }
    ]
}