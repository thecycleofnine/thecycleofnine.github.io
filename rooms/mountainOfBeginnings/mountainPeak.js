const mountainPeak = {
    id: 'mountainPeak',
    area: 'Mountain of beginnings',
    name: 'Mountain peak',
    desc: `There's a bronze ***arc*** standing on the highest point of the mountain. You can ***go*** through it to the ***east***. The topside of the ***arc*** is shooting waves of gravity high into the purple sky.
    In the distance below you can see a fisher village and a dark maze-like forest.`,
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
                println(`The ***Fine Axe*** gets sucked into the gate. It vanishes in an instant.`)
                getRoom('frostLands').items.push(
                    {
                        name: 'Fine Axe',
                        desc: `The axe is made of the frozen tears of a giant.
                        To use it, you can ***swing at*** things.`,
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