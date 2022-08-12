const roadToFrostVillage = {
    id: 'roadToFrostVillage',
    area: 'Frost lands',
    name: 'Road to Frost village',
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