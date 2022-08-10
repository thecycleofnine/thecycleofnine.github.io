const roadToFrostVillage = {
    id: 'roadToFrostVillage',
    name: 'Road to Frost Village',
    desc: `Thousands of giant footsteps have formed a passable road here. You hear music coming from the ***northeast*** where the road leads.`,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`TBAopen`)
        } else {
            println(`TBAclosed`)
        }
    },
    exits: [
        { dir: 'west', id: 'frostLands' },
        { dir: 'northeast', id: 'frostVillageGate' }
    ]
}