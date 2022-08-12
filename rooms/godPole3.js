const godPole3 = {
    id: 'godPole3',
    area: 'Fisher village',
    name: `Third wooden pole`,
    desc: `The carving depicts a gentle goddess wearing silk-like garment and a keychain on her waist. She is surrounded by unwoven ***threads*** and she's holding a ***baby*** in her arms.`,
    printDescriptions: true,
    onFeel: () => {
        if (player.eyesAreOpen) {
            if (player.friggsBlessing) {
                println(`You feel a protective presence. Reciprocity has been established.`)
            } else {
                println(`You feel a gentle and warm presence but something is missing.`)
            }
        } else {
            if (player.friggsBlessing) {
                println(`You feel a divine protection. Your fate is known and your luck is being boosted reciprocally.`)
            } else {
                println(`You feel gentleness and warmth but reciprocity has not yet been established by your actions.`)
            }
        }
    },
    items: [
        {
            name: 'threads',
            desc: `The unwoven threads are about to be woven. The goddess seems to be reading and interpreting them diligently.`,
            onSwing: () => println(`The threads are cut but yet they are not.`),
            onEat: () => println(`You munch on the unwoven ***threads***.
            They taste like possibilities.`),
        },
        {
            name: 'baby',
            desc: `The baby is beautiful as if he was shining. His mother is protecting him in her arms.`,
            onSwing: () => println(`The axe stops inches away from the baby as if not willing or able to harm him.`),
            onEat: () => println(`You try to munch on the ***baby*** but your teeth cannot connect.
            It seems your teeth are not willing or able to harm the baby.`),
        }
    ],
    exits: [
        { dir: 'northwest', id: 'godPole2' },
        { dir: 'southwest', id: 'godPole4' },
        { dir: 'west', id: 'fisherVillageAltar' },
        { dir: 'north', id: 'fisherVillageSquare' },
    ]
}