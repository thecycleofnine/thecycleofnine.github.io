const housecarl = {
    name: ['Housecarl', `The Housecarl`],
    roomId: 'chieftainsHouseEntrance',
    // printed when the player looks at the character
    desc: `The **Housecarl** seems to be a Frost Giant of some prestige. A shining blue ***longsword*** is dangling from her hip ready to drop some heads. Her white braided hair show the unquestionable skill of her servants.`,
    onSwing: () => {
        const room = getRoom('chieftainsHouseEntrance')
        println(`You hear a swish as your head drops from your shoulders.`)
        toValhalla(room.foes[0])
    },
    firstConversation: true,
    // optional callback, run when the player talks to this character
    onTalk: () => {
        const char = getCharacter('housecarl')
        if (char.firstConversation) {
            println(`"A human?", the **Housecarl** says in a deeply harmonious yet scratching sound.
            "What might a mere human be doing here?", she asks with a genuine interest.`)
        } else {
            println(`"Hello, human", says the Housecarl condescendingly.`)
        }
        char.firstConversation = false
    },
    // things the player can discuss with the character
    topics: [
        {
            option: `***Did*** you call me a mere human?`,
            removeOnRead: true,
            line: `"Well, yes", she confirms authoritatively.
            "And I haven't seen your kind in...damned be the Nine, in a long while!"`
        },
        {
          option: '***What*** is this place?',
          removeOnRead: true,
          line: `"This", she pauses for a moment.
          "This is the Frost Village and you are standing in the presence of the Chieftain's own Housecarl!", she proclaims proudly.
          "I'm here to ensure that no harm befalls our Chieftain."`
        },
        {
            option: '***Can*** I go in?',
            removeOnRead: true,
            prereqs: ['what'],
            line: `"I'm assuming there's a reason as to why you were allowed inside the black gate?", the Housecarl asks inquisitively.`
        },
        {
            option: `***You*** mentioned you haven't seen any humans in a long time?`,
            removeOnRead: true,
            prereqs: ['did'],
            line: `"Quite so", she confirms.
            "Not since we came to these frostlands far away from the reign of the Nine."`
        },
        {
            option: `***Who*** are the Nine?`,
            removeOnRead: true,
            prereqs: ['you'],
            line: `"Damned be the Nine!", she fumes.
            "They are the reason as to why we had to flee in the first place."
            "Frost Giants they call us these days", she snorts indignantly. "We were quite happy as Mountain Giants before the Nine came."`,
            onSelected: () => {
                const chieftain = getCharacter('chieftain')
                chieftain.topics.push({
                    option: '***Your*** Housecarl mentioned you had to flee because of the Nine?',
                    removeOnRead: true,
                    line: `"Sadly, that is the case.", her gaze drifts somewhere far away.`
                })
            }
        },
        {
            option: `***Do*** you know what this horn is?`,
            removeOnRead: true,
            prereqs: ['can'],
            line: `"By the Nine!", the Housecarl exclamates.
            "You must bring that to the Chieftain right away."
            The **Housecarl** opens the large red door behind her with some haste.
            Enter the ***Chieftain's House*** by going ***east***.`,
            onSelected: () => {
                const room = getRoom('chieftainsHouseEntrance')
                delete room.exits[1].block
                endConversation()
            }
        }
    ],
  }