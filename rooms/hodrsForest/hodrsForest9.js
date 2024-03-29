const hodrsForest9 = {
    id: 'hodrsForest9',
    area: `Hodr's forest`,
    name: `Center of Hodr's forest`,
    desc: `You have found your way to the center of Hodr's Forest.
    A single beam of light illuminates a ***mistletoe*** on the mossy ground.`,
    printDescriptions: true,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`TBAopen`)
        } else {
            println(`TBAclosed`)
        }
    },
    items: [
        {
            name: 'Mistletoe',
            desc: `It's young and feeble. It could not hurt anyone.`,
            isTakeable: true,
            onTake: () => {
                const char = getCharacter('Trickster')
                char.roomId = 'pathToHodrsForest'
                char.chatLog = []
                char.topics = char.topicsAfterFetchingMistletoe
                char.onTalk = () => println(`"Well done" compliments the **Trickster**.
                "For a moment, I thought you were never going to make it this far."`)
                const pathtoHodrsForest = getRoom('pathToHodrsForest')
                const room = getRoom(disk.roomId)
                pathtoHodrsForest.exits.map(e => e.block = `An invisible force pulls you back as you try to leave.
                You have something The **Trickster*** wants.`)
                pathtoHodrsForest.desc += `\nThe **Trickster** is leaning against a tree, watching you.`
                room.items = room.items.filter(i => i.name !== 'mistletoe')
                println(`You took the ***mistletoe***.`)
                room.desc = `You are at the center of Hodr's Forest. 
                A single beam of light illuminates the place where a mistletoe once waited for its time to come.`
            },
            onUse: () => {
                const room = getRoom(disk.roomId)
                if (room.id === 'hodrsForest9') {
                    println(`This is not the time or the place.`)
                } else {
                    println(`You crafted a ***Mistletoe dart***.`)
                    disk.inventory = disk.inventory.filter(i => i.name !== 'Mistletoe')
                    disk.inventory.push({
                        name: `Mistletoe dart`,
                        desc: `It's sharp! It can be ***throw***n ***at*** things, and it always seems to return to you.`,
                        onEat: () => println(`It's inedible. It made a nasty cut to your gums.`),
                        onSwing: () => println(`The dart vanishes just before the axe connects, and reappears in a blink of an eye. Some trickery is afoot.`),
                        onThrow: () => throwAt(),
                        onUse: () => println(`You throw the ***Mistletoe dart*** aimlessly. It curves in the air and returns to you.`),
                    })
                    const char = getCharacter('Trickster')
                    if (room.id === 'pathToHodrsForest' && char.roomId === 'pathToHodrsForest') {
                        const pathToHodrsForest = getRoom(disk.roomId)
                        pathToHodrsForest.exits.forEach(e => delete e.block)
                        endConversation()
                        char.roomId = ''
                        println(`The **Trickster** smiles mysteriously and vanishes into thin air.`)
                        const room = getRoom(disk.roomId)
                        room.desc = room.desc.replace(`\nThe **Trickster** is leaning against a tree, watching you.`, '')
                    }
                }
            },
            onEat: () => {
                const room = getRoom(disk.roomId)
                const mistle = getItemInRoom('mistletoe', room.id)
                if (mistle) {
                    room.items = room.items.filter(i => i.name !== 'Mistletoe')
                    room.desc = `You are at the center of Hodr's Forest.
                    A single beam of light illuminates the remains of a destroyed mistletoe on the mossy forest floor.`
                }
                println(`You munch on the poisonous ***mistletoe***.
                *The mistletoe has been destroyed!*
                ***Frigg's Blessing*** has been bestowed upon you.`)
                disk.inventory.push({
                    name: `Frigg's Blessing`,
                    desc: `The blessing of the great **Seer**. It brings the gift of slight foresight.
                    May your axe find its targets.`,
                    onUse: () => {
                        println(`The great **Seer** smiles upon you, always.`)
                    }
                })
                player.friggsBlessing = true
                const mistletoe = getItemInInventory('mistletoe')
                if (mistletoe) {
                    disk.inventory = disk.inventory.filter(i => i.name !== 'Mistletoe')
                }
                const quest = getQuest('locateAPlant')
                quest.failed = true
                const char = getCharacter('Trickster')
                char.roomId = ''
                const pathToHodrsForest = getRoom('pathToHodrsForest')
                pathToHodrsForest.desc = pathToHodrsForest.desc.replace(`\nThe **Trickster** is leaning against a tree, watching you.`, '')
                println(`The invisible ***Curse of the Trickster*** has been bestowed upon you.`)
                player.curseOfLoki = true
                toHel(`You have a faint memory of vomiting exorbitantly.
                You realise you are quite dead.`)
            },
            onSwing: () => {
                const room = getRoom(disk.roomId)
                const mistle = getItemInRoom('mistletoe', room.id)
                if (mistle) {
                    room.items = room.items.filter(i => i.name !== 'Mistletoe')
                    room.desc = `You are at the center of Hodr's Forest.
                    A single beam of light illuminates the remains of a destroyed mistletoe on the mossy forest floor.`
                }
                println(`You have destroyed the mistletoe!
                ***Frigg's Blessing*** has been bestowed upon you.`)
                disk.inventory.push({
                    name: `Frigg's Blessing`,
                    desc: `The blessing of the great Seer. It brings the gift of foresight.
                    May your axe find its targets.`,
                    onUse: () => {
                        println(`The great Seer will smile upon you always.`)
                    }
                })
                player.friggsBlessing = true
                const mistletoe = getItemInInventory('mistletoe')
                if (mistletoe) {
                    disk.inventory = disk.inventory.filter(i => i.name !== 'Mistletoe')
                }
                const char = getCharacter('Trickster')
                char.roomId = ''
                room.desc = room.desc.replace(`\nThe **Trickster** is leaning against a tree, watching you.`, '')
                room.exits.forEach(e => delete e.block)
                const quest = getQuest('locateAPlant')
                quest.failed = true
                println(`The invisible ***Curse of the Trickster*** has been bestowed upon you.`)
                player.curseOfLoki = true
            }
        }
    ],
    exits: [
        { dir: 'north', id: 'pathToHodrsForest' },
        { dir: 'east', id: 'pathToHodrsForest' },
        { dir: 'south', id: 'pathToHodrsForest' },
        { dir: 'west', id: 'pathToHodrsForest' },
    ]
}