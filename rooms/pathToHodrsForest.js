const pathToHodrsForest = {
    id: 'pathToHodrsForest',
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
                    room.items[0].desc = `A wooden signpost has stood here. Now only the stump remains.`
                } else {
                    println('The signpost is already broken and illegible!')
                }
            }
        },
        {
            name: 'stone',
            desc: `It's a broad memorial stone standing on three smaller stones.
            It reads "For the memory of travelers lost in Hodr's forest – may they find peace under the foliage eternal."
            It has a surprisingly long list of names carved into it.`,
            onSwing: () => println(`The memorial stone is sturdy and durable. You are risking to dull the ***Fine Axe***!`)
        }
    ],
    exits: [
        { dir: 'west', id: 'fisherVillageGate' },
        { dir: 'southeast', id: 'hodrsForest1', block: `Even when you step towards the forest it doesn't seem to get any closer.` },
    ]
}