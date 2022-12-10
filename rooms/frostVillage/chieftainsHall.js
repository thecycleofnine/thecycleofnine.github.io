const chieftainsHall = {
    id: 'chieftainsHall',
    area: 'Frost village',
    name: `Chieftain's Hall`,
    desc: `You are in the hall of the Chieftain. Wooden tables stand decorated on each side, filling the whole depth of the hall. There's a big fireplace at the center. Small Giant servants hustle around hurrily.
    The **Chieftain** sits comfortably on a throne, covered with wolfskins.`,
    onEnter: () => {
        const entrance = getRoom('chieftainsHallEntrance')
        entrance.foes = []
        const housecarl = getCharacter('housecarl')
        housecarl.roomId = 'chieftainsHall'
    },
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`TBAopen`)
        } else {
            println(`TBAclosed`)
        }
    },
    foes: [
        {
            name: ['Housecarl', 'The Housecarl'],
            hp: 200,
            alive: true,
            inCombat: false,
            isArmed: true,
            onEngage: () => {
                const room = getRoom('chieftainsHallEntrance')
                toValhall(room.foes[0])
            },
            hitDescriptions: [
                ``,
            ],
            missDescriptions: [
                ``,
            ],
            attackDescriptions: [
                ``,
            ],
        }
    ],
    exits: [
        { dir: 'west', id: 'frostVillage' }
    ]
}