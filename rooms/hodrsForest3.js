const hodrsForest3 = {
    id: 'hodrsForest3',
    name: `Lost in Hodr's Forest`,
    desc: `It seems you are utterly and completely lost. The dark forest seems endless in every direction.
    There are ***wind chimes*** made of bones attached to tree branches all over.`,
    printDescriptions: true,
    onFeel: () => {
        println(`There's a playful spirit floating above you, poking the ***wind chimes*** gleefully.`)
    },
    items: [
        {
            name: 'wind chimes',
            desc: `The wind chimes are dangling freely from the tree branches. They are made of brittle bones.`,
            onSwing: () => println(`The mischievous spirits of the forest sway the wind chimes just slightly to evade your swing.`)
        }
    ],
    exits: [
        { dir: 'south', id: 'hodrsForest4' },
        { dir: 'west', id: 'hodrsForest3' },
        { dir: 'north', id: 'hodrsForest3' },
        { dir: 'east', id: 'hodrsForest3' },
    ]
}