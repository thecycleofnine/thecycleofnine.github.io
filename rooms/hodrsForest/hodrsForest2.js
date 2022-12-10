const hodrsForest2 = {
    id: 'hodrsForest2',
    area: `Hodr's forest`,
    name: `Lost in Hodr's forest`,
    desc: `It seems you are utterly and completely lost. The dark forest seems endless in every direction.
    There are ***wind chimes*** made of bones attached to tree branches all over.
    There's some pearly white ***berries*** on the mossy forest floor.`,
    printDescriptions: true,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`You feel a lost spirit wailing nearby. Their fate has been a cruel one.`)
        } else {
            println(`TBAclosed`)
        }
    },
    items: [
        {
            name: 'wind chimes',
            desc: `The wind chimes are dangling freely from the tree branches. They are made of brittle bones.`,
            onSwing: () => println(`The mischievous spirits of the forest sway the wind chimes just slightly, making you miss your targets.`)
        },
        {
            name: 'White berries',
            desc: `The berries are round and pearly white. Something a ghost would probably eat.`,
            isTakeable: true,
            onTake: () => {
                println(`You took some ***White berries***.`)
            },
            onEat: () => {
                println(`You ate the ***White berries***.`)
                toHel(`You have a faint memory of vomiting exorbitantly.
                You realise you are quite dead.`)
            },
            onSwing: () => {
                println(`The spirits of the forest are disturbed by the sight.`)
            }
        }
    ],
    exits: [
        { dir: 'north', id: 'hodrsForest3' },
        { dir: 'east', id: 'hodrsForest2' },
        { dir: 'south', id: 'hodrsForest2' },
        { dir: 'west', id: 'hodrsForest2' },
    ]
}