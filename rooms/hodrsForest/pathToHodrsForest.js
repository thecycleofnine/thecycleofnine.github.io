const pathToHodrsForest = {
    id: 'pathToHodrsForest',
    area: `Hodr's forest`,
    name: `Dirt road`,
    desc: `A narrow dirt road leads to a dark forest in the ***southeast***.
    There's a ***signpost*** beside the road where the dirt changes into a mossy forest floor.
    A memorial ***stone*** has been placed beside the signpost.`,
    printDescriptions: true,
    signpostBroken: false,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`TBAopen`)
        } else {
            println(`TBAclosed`)
        }
    },
    items: [
        {
            name: 'signpost',
            desc: `It's a wooden signpost hammered into the dirt. It reads "Hodr's Forest".`,
            onSwing: () => {
                const room = getRoom('pathToHodrsForest')
                if (!room.signpostBroken) {
                    println(`The signpost splits cleanly in half.`)
                    room.desc = `A narrow dirt road leads to a dark forest in the ***southeast***.
                    There's a memorial ***stone*** beside the road.`
                    room.signpostBroken = true
                    room.items[0].desc = `There was once a wooden signpost here. Now, only the stump remains.`
                } else {
                    println('The signpost is already cut and illegible!')
                }
            }
        },
        {
            name: 'stone',
            desc: `It's a broad memorial stone standing on three smaller stones.
            It reads "For the memory of travelers lost in Hodr's forest. May they find peace under the foliage eternal."
            The stone has a surprisingly long list of names carved into it.`,
            onSwing: () => println(`The memorial stone is sturdy and durable. You are risking to dull the ***Fine Axe***!`)
        }
    ],
    exits: [
        { dir: 'west', id: 'fisherVillageGate' },
        { dir: 'southeast', id: 'hodrsForest1', block: `You walk towards the forest for a while, but it doesn't seem to get any closer.
        In fact, you haven't moved an inch! There is some kind of trickery afoot here.` },
    ]
}