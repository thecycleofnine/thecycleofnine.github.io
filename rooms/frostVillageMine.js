const frostVillageMine = {
    id: 'frostVillageMine',
    name: `Dark Mine`,
    desc: `TBA`,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`TBAopen`)
        } else {
            println(`TBAclosed`)
        }
    },
}