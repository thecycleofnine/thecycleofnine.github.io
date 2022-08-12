const fisherVillageMerchant = {
    name: 'Fisher village merchant',
    roomId: 'fisherVillageButik',
    desc: 'TBA',
    onSwing: () => {
        println(`TBA`)
    },
    onTalk: () => {
        println(`"Hello!" greets the **Merchant** cheerfully.
        "What would you like to buy on this fine day?"`)
    },
    topics: [
        // TBA more topics (items to sell)
        {
            option: `***Map***`,
            removeOnRead: true,
            line: `"Oh this? This you can have for free, my friend."`,
            onSelected: () => {
                disk.inventory.push({
                    name: 'Map',
                    onUse: () => map(),
                    onEat: () => println(`You munch on your ***map***.
                    And now the map is gone!`),
                    onSwing: () => {
                        println(`The map is destroyed!`)
                        disk.inventory = disk.inventory.filter(i => i.name !== 'Map')
                    },
                })
            },
        },
        {
            option: `***Thanks***.`,
            removeOnRead: true,
            prereqs: ['map'],
            line: `"No problem!" says the **Merchant** in their cheerful tone.
            "The map is not marked very well so it felt wrong to ask money for it."
            "You could always add some more places to it, though."`
        },
        {
            option: `***There*** is no money in my pockets.`,
            removeOnRead: true,
            line: `"Well, that's a nice way to live!" laughs the **Merchant**.
            "If you're not careful about using money, money may start using you instead!"`
        }
    ]
}