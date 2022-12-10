const frostVillage = {
    id: 'frostVillage',
    area: 'Frost village',
    name: 'Frost village',
    desc: `You are standing in the middle of a Giant village.
    There are Frost Giants of all sizes peeking at you behind small ice ridges. You feel unblinking blue gazes coming from all directions.
    The whole village seems to have halted at your arrival.  
    `,
    onLook: () => {
        const room = getRoom('frostVillage')
        room.desc = ''
        println(`There's a lift mechanism leading up the gate wall to the ***southwest***.
      A longhouse, unquestionably the ***Chieftain's Hall***, is to the ***east***.
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
            desc: `The mighty house is painted bright red. The roof is made from an old galley turned upside down, and decorated with painted icy shields. A huge bonfire has been lit on the roof.`
        }
    ],
    exits: [
        { dir: 'southwest', id: 'frostVillageLift' },
        { dir: 'east', id: 'chieftainsHallEntrance' },
        { dir: 'northeast', id: 'frostVillageShrine' },
        { dir: 'northwest', id: 'frostVillageMine' },
        { dir: 'west', id: 'frostVillageGate' }
    ]
}