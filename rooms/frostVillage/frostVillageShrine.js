const frostVillageShrine = {
    id: 'frostVillageShrine',
    area: 'Frost village',
    name: `Frost Village Shrine`,
    desc: `TBA`,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`TBAopen`)
        } else {
            println(`TBAclosed`)
        }
    },
}