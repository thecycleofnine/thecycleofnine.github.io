const mushlings = {
    name: ['Mushlings'],
    roomId: 'hodrsForest5',
    // printed when the player looks at the character
    desc: `"Shoom, shoom" the **mushlings** puff small spore clouds into the air.`,
    // optional callback, run when the player talks to this character
    onTalk: () => {
        println(`"Shoom, shoom" the **mushlings** puff small spore clouds into the air.`)
    },
    // things the player can discuss with the character
    topics: [
        {
            option: `***Hello***.`,
            line: `There is no response.
            You are talking to mushrooms after all...`,
            removeOnRead: true,
        },
    ],
  }