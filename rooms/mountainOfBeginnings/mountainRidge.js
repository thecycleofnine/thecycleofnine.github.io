const mountainRidge = {
    id: 'mountainRidge',
    area: 'Mountain of beginnings',
    name: 'Mountain ridge',
    desc: `You are standing on a narrow ridge near the ***top*** of the mountain. The ***top*** is just an axe's throw to the ***north***. It's so cold up here one's bones could freeze. A large ***boulder*** of ice has something written to it.`,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`TBAopen`)
        } else {
            println(`TBAclosed`)
        }
    },
    items: [
        {
            name: 'top',
            desc: `There's a gate-like ***arc*** on the top of the mountain, bronze in color. A giant could easily walk through it. The very top of the ***arc*** shoots waves of energy towards the purple sky.`
        },
        {
            name: 'arc',
            desc: `The arc is masterfully constructed. The bronze surface has peculiar carvings all over it. They seem to move. The metal itself seems to be in constant stationary movement.`
        },
        {
            name: 'boulder',
            desc: `The boulder reads:
        "Behold the masterpiece of Austre the Dwarf!
        This construction channels the gravitational waves from the Earth's core to keep the sky from floating away.
        You're welcome!"`,
        }
    ],
    exits: [
        { dir: 'west', id: 'mountainTrail' },
        { dir: 'north', id: 'mountainPeak' }
    ]
}