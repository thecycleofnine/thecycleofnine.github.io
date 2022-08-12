const frostVillageMine = {
    id: 'frostVillageMine',
    area: 'Frost village',
    name: `Dark Mine`,
    desc: `TBA`,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`TBAopen`)
        } else {
            println(`TBAclosed`)
        }
    },
    exits: [
        // TBA
    ]
}