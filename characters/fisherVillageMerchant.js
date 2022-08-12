const fisherVillageMerchant = {
    name: 'Fisher village merchant',
    roomId: 'fisherVillageButik',
    desc: 'TBA',
    onSwing: () => {
        println(`TBA`)
    },
    onTalk: () => {
        println(`"Hello!" greets the **Merchant** cheerfully.
        "What can I do for you on this fine day?"`)
    },
    topics: [
        // TBA more topics (items to sell)
        {
            option: `***Do*** you sell maps?`,
            removeOnRead: true,
            line: `"Certainly!" the **Merchant** turns to grab one from behind the counter. 
            "But this you can have for free, my friend."
            The **Merchant** hands you a ***Map***.`,
            onSelected: () => {
                disk.inventory.push({
                    name: 'Map',
                    desc: `It's a map containing familiar places.`,
                    onLook: () => map(),
                    onUse: () => map(),
                    onEat: () => println(`You munch on your ***map***.
                    And now the map is gone!`),
                    onSwing: () => {
                        println(`The map is destroyed!`)
                        disk.inventory = disk.inventory.filter(i => i.name !== 'Map')
                    },
                })
            }
        },
        {
            option: `***Thank*** you.`,
            removeOnRead: true,
            prereqs: ['do'],
            line: `"No problem!" says the **Merchant** in their cheerful tone.
            "The ***Map*** is not marked very well so it felt wrong to ask money for it."
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