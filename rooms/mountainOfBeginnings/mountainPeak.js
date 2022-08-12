const mountainPeak = {
    id: 'mountainPeak',
    area: 'Mountain of beginnings',
    name: 'Mountain peak',
    desc: `DESCRIBE THE LAND (VISTA) HERE.
    There's a bronze ***arc*** standing on the highest point of the mountain peak to the ***east***. It seems to be some kind of a gate. The topside of the ***arc*** is shooting colorless waves high into the purple sky.`,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`TBAopen`)
        } else {
            println(`TBAclosed`)
        }
    },
    items: [
        {
            name: 'arc',
            desc: `The huge bronze arc is in constant stationary movement. The hard bronze surface of the arc gate seems like liquid. It's an impossible construction. The inside of the arc forms a gate, which is breathing blue frost into the air. ᛅᚢᛋᛏᚱᛅ is carved in the bronze above the gate.`,
            onSwing: () => {
                disk.inventory = disk.inventory.filter(i => i.name !== 'Fine Axe')
                println(`The ***Fine Axe*** gets sucked into the gate. It vanishes into the frosty air in an instant.`)
                getRoom('frostLands').items.push(
                    {
                        name: 'Fine Axe',
                        desc: `The axe is made of the frozen tears of a giant.
              Tou use it you can ***swing at*** things.`,
                        onUse: () => {
                            println(`You swing the ***Fine Axe*** aimlessly.`)
                        }
                    }
                )
            }
        }
    ],
    exits: [
        { dir: 'east', id: 'frostLands' },
        { dir: 'south', id: 'mountainRidge' }
    ]
}