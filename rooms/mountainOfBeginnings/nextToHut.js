const nextToHut = {
    id: 'nextToHut',
    area: 'Mountain of beginnings',
    name: 'Beside a Clay Hut',
    desc: `There's a small hut made of clay with a straw roof. Its ***entrance*** is to the ***south***.
    To the ***east*** there's a steep path up a foul-looking mountain. The peak is covered in thick sheets of ice. Some kind of energy is rising from the top towards the purple sky.`,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`TBAopen`)
        } else {
            println(`TBAclosed`)
        }
    },
    items: [
        {
            name: 'entrance',
            desc: `The entrance has a wooden frame. There are strange runes carved all over it.
        The wooden ***door*** is closed.`,
        },
        {
            name: 'door',
            desc: `It's a perfectly good wooden door.`,
            onOpen: () => {
                println(`It's locked.`)
            },
            onSwing: () => {
                const room = getRoom('nextToHut')
                room.items[1].desc = 'It was a perfectly good wooden door...'
                room.items[0].desc = `The entrance has a wooden frame. There are strange runes carved all over it.
          The wooden ***door*** is in splinters.`
                println(`The wooden door splinters to pieces.
          The runes carved into the ***entrance*** frame start to glow.`)
                delete getRoom('nextToHut').exits[1].block;
            }
        }
    ],
    exits: [
        { dir: 'southwest', id: 'fieldOfEyesAndEars' },
        { dir: 'south', id: 'insideHut', block: `The door is locked.` },
        { dir: 'east', id: 'mountainTrail' },
    ],
}