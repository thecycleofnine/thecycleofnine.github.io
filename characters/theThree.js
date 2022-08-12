const theThree = {
    name: ['The Three', `Three`],
    roomId: 'spiritWorld5',
    // printed when the player looks at the character
    desc: `**The Three** women are weaving the ***web*** for all things.
    They have all the questions. They have all the answers.`,
    alreadyTalked: true,
    onSwing: () => {
        println(`Such a thing will not be woven.`)
    },
    onEat: () => {
        println(`Such a thing will not be woven.`)
    },
    // optional callback, run when the player talks to this character
    onTalk: () => {
        if (disk.inputs.includes('past') && disk.inputs.includes('present') && disk.inputs.includes('future')) {
            println(`**The Three** weave the ***web*** for all things.
            "What do you want to know?" they ask 
            as if there were any questions left to ask.`)
            return
        }
        println(`**The Three** weave the ***web*** for all things.
        "What do you want to know?" they ask as if the questions were yours.`)
        const room = getRoom(disk.roomId)
        room.exits.forEach(e => delete e.block)
    },
    // things the player can discuss with the character
    topics: [
        {
            option: `***Past***. Who am I?`,
            removeOnRead: true,
            line: `The first of **The three** replies.
            "You are a story."`
        },
        {
            option: `***Present***. What am I becoming?`,
            removeOnRead: true,
            line: `The second of **The Three** replies.
            "You are becoming a legend."`
        },
        {
            option: `***Future***. What shall I be?`,
            removeOnRead: true,
            line: `The third of **The Three** replies.
            "You shall be forgotten."`
        },
    ],
  }