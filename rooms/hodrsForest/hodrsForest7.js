const hodrsForest7 = {
    id: 'hodrsForest7',
    area: `Hodr's forest`,
    name: `Lost in Hodr's forest`,
    desc: `It seems you are utterly and completely lost. The dark forest seems endless in every direction.
    There are ***wind chimes*** made of bones attached to tree branches all over.`,
    printDescriptions: true,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`The spirits of the forest speak of the Blind One.
            He will be deceived by the Trickster.`)
        } else {
            println(`TBAclosed`)
        }
    },
    items: [
        {
            name: 'wind chimes',
            desc: `The wind chimes are dangling freely from the tree branches. They are made of brittle bones.`,
            onSwing: () => println(`The mischievous spirits of the forest sway the wind chimes just slightly, making you miss your targets.`)
        }
    ],
    exits: [
        { dir: 'west', id: 'hodrsForest8' },
        { dir: 'north', id: 'hodrsForest7' },
        { dir: 'east', id: 'hodrsForest7' },
        { dir: 'south', id: 'hodrsForest7' },
    ]
}