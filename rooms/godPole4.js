const godPole4 = {
    id: 'godPole4',
    name: `Fourth wooden pole`,
    desc: `The carving depicts a beautiful god, as if he was shining. His modest blonde beard has many tidy braids with pretty beads at the ends. The god ***pole*** smells nice and everything about it is very pleasant.`,
    printDescriptions: true,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`You feel a playful presence.`)
        } else {
            println(`You feel playful but there is also something of grave importance here.
            Manipulation and treachery of some sort? But by whom?`)
        }
    },
    items: [
        {
            name: 'pole',
            onSwing: () => println(`The axe stops a few inches away from the target.
            It's as if the blade is unwilling or unable to harm the god pole.`),
            onEat: () => println(`You try to sink your teeth into the pole but can't connect with it.
            It's as if your teeth were unwilling or unable to harm the god pole.`),
        }
    ],
    exits: [
        { dir: 'northeast', id: 'godPole3' },
        { dir: 'southwest', id: 'godPole5' },
        { dir: 'west', id: 'fisherVillageSquare' },
        { dir: 'northwest', id: 'fisherVillageAltar' },
    ]
}