const austre = {
    name: ['Austre', 'Dwarf', 'The Dwarf'],
    roomId: 'mountainRidge',
    desc: `The **Dwarf** is weeping in a cave behind the ***boulder***. They are in a great need of help.`,
    onTalk: () => {
        println(`"Oh, cruel are the Fates!" groans the **Dwarf** with anguish.
        "Who would believe that for the lack of only three words thou shouldst lie here forever, unfinished!"`)
    },
    // things the player can discuss with the character
    topics: [
        {
            option: `***Who*** are you?`,
            line: `The **Dwarf** is startled by your arrival. They respond hastily from behind the ***boulder***:
            "I am sorrowful smith and singer of songs!
            With words of wisdom I wield my tongs!"`,
            removeOnRead: true,
        },
        {
            option: `***Why*** are you weeping?`,
            prereqs: ['who'],
            line: `The **Dwarf** smith starts wailing to their unfinished boat:
            "I shall never see thee skimming o'er the waves!"
            "Thou wilt never carry me o'er the ocean! How cruel my misery!"`,
            removeOnRead: true,
        },
        {
            option: `***So*** what exactly ails you, smith?`,
            prereqs: ['why'],
            line: `"With words of magic I craft my treasures but three I lack and I'm out of measures!" the **Dwarf** covers their face with their hands and starts weeping again.`,
            removeOnRead: true,
        },
        {
            option: `***Do*** you need help with the boat?`,
            prereqs: ['why'],
            line: `The **Dwarf** gets suddenly excited with hope.
            "There are but three words I desperately need,
            my boat can be finished with these words indeed!"`,
            onSelected: () => {
                println(`***Quests** accepted.*`)
                player.quests.push({
                    id: 'findWordsOfWisdom',
                    name: `Find wisdom words for Austre to help finish their boat`,
                    completed: false,
                    failed: false
                })
            },
            removeOnRead: true,
        },
        {
            option: `***How*** can I find these three words?`,
            prereqs: ['do'],
            line: `"Shoes of iron will I craft for your feet
            for sharp are the needles you'll meet!
            Copper gloves will protect your hands on the way
            for the perils will cut you like hay!"`,
            onSelected: () => {
                disk.inventory.push({
                    name: 'Iron shoes',
                    desc: `They are shoes of iron made by the dwarf Austre. They can be used to traverse sharp paths.`,
                    onSwing: () => {
                        println(`The firm shoes are made to last!`)
                    },
                    onEat: () => {
                        println(`Surely there are better sources of iron!`)
                    }
                })
                disk.inventory.push({
                    name: 'Copper gloves',
                    desc: `They are gloves of copper made by the dwarf Austre. They can be used to grab sharp blades.`,
                    onSwing: () => {
                        println(`The firm gloves are made to last!`)
                    },
                    onEat: () => {
                        println(`They have a rough taste.`)
                    }
                })
                println(`*Iron shoes have been added to your inventory.*`)
                println(`*Copper gloves have been added to your inventory.*`)
            },
            removeOnRead: true,
        },
        {
            option: `***You*** still haven't told me where to go!`,
            prereqs: ['how'],
            line: `"The footpath to his kingdom is filled with frost and his endless knowledge will cost.
            You must traverse through thorny, crooked course til you finally get to the source."`,
            removeOnRead: true,
        },
        {
            option: `***Source*** of what?`,
            prereqs: ['you'],
            line: `"Wisdom!" shouts the **Dwarf** so excitedly that they forget to sing in riddles.
            "Far away in his own large hall lies the giant Riddle Weaver, the wisdom keeper. He is wiser than all wizards and stronger than all strong men. From him you may learn a hundred wisdom words – yes, a thousand words of wisdom!"`,
            removeOnRead: true,
        },
        {
            option: `***And*** with these words you can build your boat?`,
            prereqs: ['source'],
            line: `"Yes!" shouts the **Dwarf**.
            "Now go and come back and surely nothing you will lack!"`,
            onSelected: () => {
                println(`*The conversation has ended.*`)
                endConversation()
                const room = getRoom(disk.roomId)
                room.exits.forEach(exit => delete exit.block)
            },
            removeOnRead: true,
        },
        {
            option: `***Will*** he give these words freely?`,
            prereqs: ['source'],
            line: `"Freely his wisdom he surely won't give,
            be brave or use cunning and surely you'll live!"`,
            removeOnRead: true,
        },
    ],
}