const hodrsForest4 = {
    id: 'hodrsForest4',
    name: `Lost in Hodr's Forest`,
    desc: `It seems you are utterly and completely lost. The dark forest seems endless in every direction.
    There are ***wind chimes*** made of bones attached to tree branches all over.
    There's some pearly white ***berries*** on the mossy forest floor.`,
    printDescriptions: true,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`The moss feels soft under your feet. Maybe it's not so bad to get lost in this place after all.`)
        } else {
            println(`TBAclosed`)
        }
    },
    items: [
        {
            name: 'wind chimes',
            desc: `The wind chimes are dangling freely from the tree branches. They are made of brittle bones.`,
            onSwing: () => println(`The mischievous spirits of the forest sway the wind chimes just slightly to evade your swing.`)
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
        { dir: 'south', id: 'hodrsForest5' },
        { dir: 'west', id: 'hodrsForest4' },
        { dir: 'north', id: 'hodrsForest4' },
        { dir: 'east', id: 'hodrsForest4' },
    ]
}