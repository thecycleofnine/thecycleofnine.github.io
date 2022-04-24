const trickster = {
    name: ['Trickster', `Someone`, 'someone'],
    roomId: '',
    // printed when the player looks at the character
    desc: `He's the **Trickster**. He wears a green attire made of snake skin.
    His eyes are dark and his expression is cunning.`,
    onSwing: () => {
        println(`The **Trickster** evades the swing easily.
        There is no catching the **Trickster**.`)
    },
    // optional callback, run when the player talks to this character
    onTalk: () => {
        const room = getRoom(disk.roomId)
        if (room.id === 'hel') {
            println(`The **Trickster** looks around as if to make sure nobody is listening.
            "I couldn't but overhear your discussion with **Hel**", says the **Trickster** with a smirk on his face.`)
        }
        room.onLook = () => println(`You are in a large hall. It's dark but you're able to see the outlines of a very long ***table***.
        There's a ***throne*** at the other end of the table and **Hel** is sitting in it.
        The **Trickster** is lurking in a shadowy corner.`)
    },
    // things the player can discuss with the character
    topics: [
        {
            option: `***Oh*** yeah? What about it?`,
            removeOnRead: true,
            line: `The **Trickster**'s smile widens.
            "It's just that I might, if given the chance..."
            the **Trickster** bows a little.
            "...be able to alleviate your situation."`
        },
        {
            option: `***How*** could you alleviate my situation?`,
            removeOnRead: true,
            prereqs: ['oh'],
            line: `"You see", the **Trickster** waves his fingertips around elegantly.
            "I happen to be somewhat proficient in all sorts of tricks and illusions."
            "I could be of great help to you, my pale friend."`
        },
        {
            option: `***And*** what would you ask in return?`,
            removeOnRead: true,
            prereqs: ['how'],
            line: `"Oh, just a small task.", the **Trickster** assures smilingly.
            "It's nothing, really. You would just need to fetch something for me."`,
            onSelected: () => {
                const char = getCharacter('Trickster')
                char.onTalk = () => {
                    const room = getRoom(disk.roomId)
                    if (room.id === 'hel') {
                        println(`The **Trickster** looks around as if to make sure nobody is listening.
                        "Well?", he asks very quietly.`)
                    }
                }
            }
        },
        {
            option: `***What*** would I be fetching?`,
            removeOnRead: true,
            prereqs: ['and'],
            line: `"Oh, nothing of importance", says the **Trickster** innocently.
            "Just a small plant from the center of Hodr's Forest, that's all."`
        },{
            option: `***Where*** is Hodr's Forest again?`,
            prereqs: ['what'],
            line: `"It's just a stone's throw away from the old fishers village. It's ***south*** from the mountain ranges and ***east*** from the village gate."
            "You will find it eventually, I'm sure."`

        },
        {
            option: `***Done***. It's a deal.`,
            removeOnRead: true,
            prereqs: ['and', 'what'],
            line: `"Indeed", says the **Trickster** trying to conceal his excitement.
            "Just talk to **Hel** again and I'll take care of the rest. A simple hearing spell should do the trick."
            "I'll find you when you have obtained the plant from Hodr's Forest..."`,
            onSelected: () => {
                player.quests.push({
                    id: 'locateAPlant',
                    name: `Locate a plant at the Hodr's Forest for the Trickster.`,
                    completed: false,
                    failed: false
                })
                const char = getCharacter('Trickster')
                char.roomId = ''
                const room = getRoom(disk.roomId)
                room.onLook = () => {
                    println(`You are in a large hall. It's dark but you're able to see the outlines of a very long ***table***.
                    There's a ***throne*** at the other end of the table and **Hel** is sitting on it.`)
                }
                const hela = getCharacter('Hel')
                hela.chatLog = hela.chatLog.filter(t => t !== 'all')
                hela.topics = hela.topics.filter(t => !t.option.includes('***All***'))
                hela.topics.push({
                    option: `***All*** things weep at my death.`,
                    prereqs: ['wept'],
                    removeOnRead: true,
                    line: `"Wait...", **Hel** says incredulously.
                    "It really does seem to be so. I-I can hear them weeping!"
                    "I can hear the rocks and the ponds, the animals and all of the elements. I can hear how the people are weeping for you. They are all weeping!"
                    "What have you done?", **Hel** asks in disbelief.`,
                    onSelected: () => {
                        const hela = getCharacter('Hel')
                        hela.topics = hela.topics.filter(t => !t.option.includes('***What***') && !t.option.includes('***It***'))
                    }
                })
                hela.topics.push({
                    option: `***Guess*** I'm just liked is all.`,
                    removeOnRead: true,
                    prereqs: ['all'],
                    line: `**Hel** looks at you suspiciously.
                    "Very well. Although I don't know how you did it, I won't go back on my word."
                    "Here's my ***Blessing***. You can ***use*** it to travel back to the world of the living."`,
                    onSelected: () => {
                        const char = getCharacter('Hel')
                        char.topics = char.topics.filter(t => (!t.option.includes('***Guess***') && !t.option.includes('***Got***')))
                        char.topics.push({
                            option: `***Thanks***.`,
                            removeOnRead: true,
                            line: `"You're welcome to stay, of course. It's not so bad here when you get used to it."
                            "It's your choice, it seems."`
                        })
                        disk.inventory.push({
                            name: `Hel's Blessing`,
                            desc: `Trickery was done and a contract was made. It gives a safe passage back from Hel.`,
                            onUse: () => {
                                useHelsBlessing()
                            }
                        })
                    }
                })
                hela.topics.push({
                    option: `***Got*** some help from a friend.`,
                    removeOnRead: true,
                    prereqs: ['all'],
                    line: `**Hel** looks at you suspiciously.
                    "Very well. Although I don't know how you did it, I won't go back on my word."
                    "Here's my ***Blessing***. You can use it to travel back to the world of the living."`,
                    onSelected: () => {
                        const char = getCharacter('Hel')
                        char.topics = char.topics.filter(t => (!t.option.includes('***Guess***') && !t.option.includes('***Got***')))
                        char.topics.push({
                            option: `***Thanks***.`,
                            removeOnRead: true,
                            line: `You're welcome to stay, of course. It's not so bad down here. **Hel** says defensively.
                            It's your choice, it seems.`
                        })
                        disk.inventory.push({
                            name: `Hel's Blessing`,
                            desc: `Trickery was done and a contract was made. It gives a safe passage back from Hel.`,
                            onUse: () => {
                                useHelsBlessing()
                            }
                        })
                    }
                })
                println(`***The Trickster vanishes from sight.***`)
                endConversation()
            }
        },
        {
            option: `***No*** deal. I'm not getting involved in this.`,
            prereqs: ['and'],
            line: `The **Trickster** sighs.
            "Well, I'll be here should you change your mind."
            "Not for long, though", the **Trickster** adds as you start to walk away.`,
            onSelected: () => {
                const char = getCharacter('Trickster')
                char.onTalk = () => {
                    const room = getRoom(disk.roomId)
                    if (room.id === 'hel') {
                        println(`The **Trickster** looks around as if to make sure nobody is listening.
                        "Well?", he asks very quietly.`)
                    }
                }
                endConversation()
            }
        },
        {
            option: `***Something*** seems off about this.`,
            removeOnRead: true,
            prereqs: ['and'],
            line: `"Oh, not at all, not at all", the **Trickster** reassures with a warm smile on his face.
            "Do we have a deal?", he asks gleam in his eyes.`
        }
    ],
    topicsAfterFetchingMistletoe: [
        {
            option: `***Here*** 's the mistletoe.`,
            removeOnRead: true,
            line: `"An honest bargain", the **Trickster** vanishes the mistletoe with a wave of his hand.
            "Though I can't but feel a little swindled."`,
            onSelected: () => {
                const room = getRoom(disk.roomId)
                room.exits.forEach(e => e.block = `The **Trickster** teleports you back to him.
                He feels swindled.`)
                disk.inventory = disk.inventory.filter(i => i.name !== 'Mistletoe')
                const char = getCharacter('Trickster')
                char.topics = char.topics.filter(t => !t.option.includes('***Here***') && !t.option.includes('***On***'))
            }
        }, {
            option: `***On*** second thought, I think I will keep this mistletoe.`,
            removeOnRead: true,
            line: `The **Trickster** gasps and tries to look most betrayed.
            "Well, I wouldn't have wanted it anyway", he says crossing his hands accross his chest.
            "I wouldn't have ***use***d it to make anything anyway."`,
            onSelected: () => {
                const char = getCharacter('Trickster')
                char.topics = char.topics.filter(t => !t.option.includes('***Here***') && !t.option.includes('***On***'))
            }
        }, {
            option: `***Swindled*** how? What are you talking about?`,
            removeOnRead: true,
            prereqs: ['here'],
            line: `"An honorable fellow like yourself would surely feel a smidge of guilt for receiving so much for giving so little, yes?", the **Trickster** says guilelessly.`
        },
        {
            option: `***What*** can be made of this mistletoe?`,
            removeOnRead: true,
            prereqs: ['on'],
            line: `"Oh, nothing", the **Trickster** pretends to have lost all interest.
            "Good day."`,
            onSelected: () => {
                endConversation()
                const char = getCharacter('Trickster')
                char.roomId = ''
                println(`***The Trickster vanishes into thin air.***`)
                const room = getRoom(disk.roomId)
                room.desc = room.desc.replace(`\nThe **Trickster** is leaning at a tree, watching you.`, '')
                room.exits.forEach(e => delete e.block)
                const item = getItemInInventory('Mistletoe')
                item.onUse = () => {
                    println(`You crafted a ***Mistletoe dart***.`)
                    const quest = getQuest('locateAPlant')
                    quest.completed = true
                    disk.inventory = disk.inventory.filter(i => i.name !== 'Mistletoe')
                    disk.inventory.push({
                        name: `Mistletoe dart`,
                        desc: `It's sharp! It can be ***throw***n ***at*** things and it always seems to come back.`,
                        onEat: () => println(`It's inedible. It made a nasty cut to your gums.`),
                        onSwing: () => println(`The dart vanishes just before the axe connects and reappears as the axe has passed through.`),
                        onThrow: () => throwAt(),
                        onUse: () => println(`You throw the ***Mistletoe dart*** aimlessly. It curves in the air and returns.`),
                    })
                }
            }
        },
        {
            option: `***Good***.`,
            removeOnRead: true,
            prereqs: ['on'],
            line: `"Good", the **Trickster** replies back.`
        },
        {
            option: `***Thanks***.`,
            prereqs: ['this'],
            removeOnRead: true,
            line: `"Not at all", the **Trickster** responds gracefully.
            "You can ***use*** it to make something interesting." he says mysteriously.`,
            onSelected: () => {
                endConversation()
                const char = getCharacter('Trickster')
                char.roomId = ''
                println(`***The Trickster vanishes from sight.***`)
                const room = getRoom(disk.roomId)
                room.desc = room.desc.replace(`\nThe **Trickster** is leaning at a tree, watching you.`, '')
                room.exits.forEach(e => delete e.block)
            }
        },
        {
            option: `***Not*** at all, actually.`,
            removeOnRead: true,
            prereqs: ['swindled'],
            line: `"How dare you!" the **Trickster** tries his utmost to appear offended.
            "Good day!" he fumes and pretends to accidentally drop something as he turns snappily to walk away.`,
            onSelected: () => {
                endConversation()
                const char = getCharacter('Trickster')
                char.roomId = ''
                println(`***The Trickster has left.***`)
                const room = getRoom(disk.roomId)
                room.desc = room.desc.replace(`\nThe **Trickster** is leaning at a tree, watching you.`, '')
                room.exits.forEach(e => delete e.block)
                room.desc += `\nThere's a ***Mistletoe dart*** on the ground.`
                room.items.push({
                    name: `Mistletoe dart`,
                    desc: `It's sharp! It can be ***throw***n ***at*** things and it always seems to come back.`,
                    onEat: () => println(`It's inedible. It made a nasty cut to your gums.`),
                    onSwing: () => println(`The dart vanishes just before the axe connects and reappears as the axe has passed through.`),
                    onThrow: () => throwAt(),
                    onUse: () => println(`You throw the ***Mistletoe dart*** aimlessly. It curves in the air and returns.`),
                    onTake: () => {
                        const quest = getQuest('locateAPlant')
                        quest.completed = true
                        const room = getRoom(disk.roomId)
                        room.desc = room.desc.replace(`\nThere's a ***Mistletoe dart*** on the ground.`, '')
                        room.items = room.items.filter(i => i.name !== 'Mistletoe dart')
                        println(`You took the ***Mistletoe dart***.`)
                        disk.inventory.push({
                            name: `Mistletoe dart`,
                            desc: `It's sharp! It can be ***throw***n ***at*** things and it always seems to come back.`,
                            onEat: () => println(`It's inedible. It made a nasty cut to your gums.`),
                            onSwing: () => println(`The dart vanishes just before the axe connects and reappears as the axe has passed through.`),
                            onThrow: () => throwAt(),
                            onUse: () => println(`You throw the ***Mistletoe dart*** aimlessly. It curves in the air and returns.`)
                        })
                    }
                })
            }
        },
        {
            option: `***This*** is not honorable, I admit. There something more I could do for you?`,
            removeOnRead: true,
            prereqs: ['swindled'],
            line: `"Honest to the core", the **Trickster** praises and waves his hand slightly.
            The mistletoe appears on his palm again.
            "Honesty like that should be rewarded."
            ***The Trickster gives you a Mistletoe dart.***`,
            onSelected: () => {
                const quest = getQuest('locateAPlant')
                quest.completed = true
                const char = getCharacter('Trickster')
                char.topics = char.topics.filter(t => !t.option.includes('***Not***'))
                disk.inventory.push({
                    name: `Mistletoe dart`,
                    desc: `It's sharp! It can be ***throw***n ***at*** things and it always seems to come back.`,
                    onEat: () => println(`It's inedible. It made a nasty cut to your gums.`),
                    onSwing: () => println(`The dart vanishes just before the axe connects and reappears as the axe has passed through.`),
                    onThrow: () => throwAt(),
                    onUse: () => println(`You throw the ***Mistletoe dart*** aimlessly. It curves in the air and returns.`)
                })
            }
        },
        {
            option: `***Should*** I do something with this?`,
            removeOnRead: true,
            prereqs: ['this'],
            line: `"Oh, I don't know. It's a dart.
            You can throw it at" the **Trickster** pauses for a moment
            "...things." there is a uncomfortably long pause.
            "Got to dash now, I'm sure we'll meet again!"
            *The **Trickster** vanishes from sight.*`,
            onSelected: () => {
                const room = getRoom(disk.roomId)
                room.desc = room.desc.replace(`\nThe **Trickster** is leaning at a tree, watching you.`, '')
                room.exits.forEach(e => delete e.block)
                const char = getCharacter('Trickster')
                char.roomId = ''
                endConversation()
            }
        }
    ]
  }