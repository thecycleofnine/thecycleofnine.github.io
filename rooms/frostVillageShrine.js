const frostVillageShrine = {
    id: 'frostVillageShrine',
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