const hodrsForest1 = {
    id: 'hodrsForest1',
    area: `Hodr's forest`,
    name: `Lost in Hodr's forest`,
    desc: `It seems you are utterly and completely lost. The dark forest seems endless in every direction.
    There are ***wind chimes*** made of bones attached to tree branches all over.`,
    printDescriptions: true,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`The spirits of the forest are following you closely. You feel their cool breeze as they float around.`)
        } else {
            println(`TBAclosed`)
        }
    },
    items: [
        {
            name: 'wind chimes',
            desc: `The wind chimes are dangling freely from the tree branches. They are made of brittle bones.`,
            onSwing: () => println(`The mischievous spirits of the forest sway the wind chimes just slightly to evade your swing.`)
        }
    ],
    exits: [
        { dir: 'north', id: 'hodrsForest2' },
        { dir: 'east', id: 'hodrsForest1' },
        { dir: 'south', id: 'hodrsForest1' },
        { dir: 'west', id: 'hodrsForest1' },
    ]
}