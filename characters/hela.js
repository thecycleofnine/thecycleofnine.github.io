const hela = {
    name: ['Hel', `woman`, 'Woman'],
    roomId: 'hel',
    allThingsWeep: false,
    // printed when the player looks at the character
    desc: `She's **Hel**. The goddess of the underworld. Half of her face is scorched black and the other half is pale white.
    Her expression is stern and dignified.`,
    onSwing: () => {
        println(`The axe sinks deep into her flesh and then heals instantly.
        She glances at you impatiently and simply asks "Are you finished?".
        **Hel** can't be damaged here.`)
    },
    // optional callback, run when the player talks to this character
    onTalk: () => {
        println(`"Yes?" **Hel** asks looking down on you.`)
        const throne = getItemInRoom('throne', disk.roomId)
        throne.desc = `It's entirely made of fingernails.`
    },
    onEat: () => {
        println(`**Hel** is very confused by your attempt and pushes you away appalled.`)
    },
    // things the player can discuss with the character
    topics: [
        {
            option: `***What*** is this place?`,
            removeOnRead: true,
            line: `"Don't mock me, human" **Hel** says indignantly.
            "This is obviously my hall, Hel."`
        },
        {
            option: `***You*** have the same name as this place?`,
            removeOnRead: true,
            prereqs: ['what'],
            line: `"Well, of course" **Hel** responds proudly.
            "This is my hall. These are my people. People who have nowhere else to go. People who have died an inglorious death."`
        },
        {
            option: `***Hel***, are you saying I died ingloriously?`,
            removeOnRead: true,
            prereqs: ['you'],
            line: `"You're here, aren't you? Only people who have died of sickness, old age or in an otherwise undignified manner end up here. There's no shame in that."
            "No glory either, though."`
        },
        {
            option: `***How*** can I get out of here?`,
            removeOnRead: true,
            line: `"Out of here?" **Hel** repeats slightly amused.
            "The only way for you to get out of here would be if all things wept for you, my dear."`
        },
        {
            option: `***Wept*** for me?`,
            prereqs: ['how'],
            removeOnRead: true,
            line: `"Oh, yes. If all things wept at your passing – if all of the the people, animals, rocks and mountains, plants, iron, clouds and all things wept for you – only then would I let you wander outside my hall, back amongst the living."`,
            onSelected: () => {
                const room = getRoom(disk.roomId)
                const trickster = getCharacter('Trickster')
                trickster.roomId = room.id
                room.onLook = () => println(`You are in a large hall. It's dark but you're able to see the outlines of a very long ***table***.
                There's a ***throne*** at the other end of the table and **Hel** is sitting in it.
                **Someone** is lurking in a shadowy corner.`)
            }
        },
        {
            option: `***It*** 's a bit much all this.`,
            prereqs: ['wept'],
            removeOnRead: true,
            line: `"Oh, pish posh." **Hel** waves her hand belittlingly.
            "Feast at my table, newling" she says encouragingly.
            "I hear the food is quite delightful."`
        },
        {
            option: `***All*** things weep at my death.`,
            prereqs: ['wept'],
            onSelected: () => {
                if (!this.allThingsSelectedAlready) {
                    println(`"Ha!" **Hel** chortles sarcastically.
                    "Quite a fellow we've got here! Are you sure it is not just yourself who is weeping?"
                    "Sit down, newling. Have a drink."`)
                } else {
                    println(`"Sit down, dear. No one is weeping for you" **Hel** says irritably.`)
                    println(`*The conversation has ended.*`)
                    endConversation()
                }
            }
        },
    ],
    topicsAfterLeavingHel: [
        {
            option: `***Nope***. I'll be going now.`,
            removeOnRead: true,
            line: `"I just want to say this is highly irregular" **Hel** says slightly annoyed.
            "Well, off you go then."`,
            onSelected: () => {
                endConversation()
                println(`*The conversation has ended.*`)
                const char = getCharacter('Hel')
                char.topics = char.topics.filter(t => !t.option.includes('***Nope***') && !t.option.includes('***Sure***'))
            }
        }, {
            option: `***Sure***, I'll stay.`,
            removeOnRead: true,
            line: `"Excellent" **Hel** replies with a smile-like expression on her face.
            "Eat and drink as much as you like!"`,
            onSelected: () => {
                const char = getCharacter('Hel')
                char.topics = char.topics.filter(t => !t.option.includes('***Nope***') && !t.option.includes('***Sure***'))
            }
        }, {
            option: `***Just*** kidding, I'll be going now.`,
            prereqs: ['sure'],
            removeOnRead: true,
            line: `**Hel**'s expression tightens.
            "I could withdraw my ***Blessing*** at any time, you know." she says coolly.`,
            onSelected: () => {
                endConversation()
                println(`*The conversation has ended.*`)
            }
        }
    ]
  }