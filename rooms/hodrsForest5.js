const hodrsForest5 = {
    id: 'hodrsForest5',
    name: `Lost in Hodr's Forest`,
    desc: `It seems you are utterly and completely lost. The dark forest seems endless in every direction.
    There are ***wind chimes*** made of bones attached to tree branches all over.`,
    printDescriptions: true,
    onFeel: () => {
        println(`The trees have a dark and venerable feeling to them.
        The have seen much. They know much. Too much.`)
    },
    items: [
        {
            name: 'wind chimes',
            desc: `The wind chimes are dangling freely from the tree branches. They are made of brittle bones.`,
            onSwing: () => println(`The mischievous spirits of the forest sway the wind chimes just slightly to evade your swing.`)
        }
    ],
    exits: [
        { dir: 'west', id: 'hodrsForest6' },
        { dir: 'north', id: 'hodrsForest5' },
        { dir: 'east', id: 'hodrsForest5' },
        { dir: 'south', id: 'hodrsForest5' },
    ]
}