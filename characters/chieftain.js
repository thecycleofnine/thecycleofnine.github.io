const chieftain = {
    name: ['Chieftain', `The Chieftain`],
    roomId: 'chieftainsHouse',
    // printed when the player looks at the character
    desc: `The **Chieftain**'s braided auburn hair is massive. Her sharp red lips contrast the shockingly green left eye, which pierces straight through you with its scrutiny. Her right eye is light blue. She doesn't seem to be a Giant at all.`,
    onSwing: () => {
        const room = getRoom('chieftainsHouse')
        println(`You hear a swish as your head drops from your shoulders.`)
        toValhalla(room.foes[0])
    },
    // optional callback, run when the player talks to this character
    onTalk: () => {
        println(`The **Chieftain**'s mismatched eyes are piercing.`)
    },
    // things the player can discuss with the character
    topics: [
        {
            option: `***Here*** 's a golden horn. Your Housecarl asked me to give this to you.`,
            removeOnRead: true,
            line: `The **Chieftain**'s eyes widen.
            "How did you get this?", she asks fervently.`
        },
        {
            option: `***Can*** I do something for you, Chieftain?`,
            removeOnRead: true,
            prereqs: ['stole'],
            line: `The **Chieftain** looks at you with a hint of suspicion.
            "Perhaps there is something you could do.", she ponders for a moment.
            "Would you be willing to TBA"`
        }
    ],
  }

  const UnhandledTopics = [
    {
        option: `***Stole*** it from some hut. (lie)`,
    },
    {
        option: `***It*** was given to me in order to deceive you. (tell the truth)`,
    },
    {
        option: `***The*** Bearded Fellow sends his regards. (attack)`,
    }
]