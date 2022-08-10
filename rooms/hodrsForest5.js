const hodrsForest5 = {
    id: 'hodrsForest5',
    name: `Lost in Hodr's Forest`,
    desc: `It seems you are utterly and completely lost. The dark forest seems endless in every direction.
    There are ***wind chimes*** made of bones attached to tree branches all over.
    ***Mushlings*** are puffing on the forest floor. They seem rather talkative.`,
    printDescriptions: true,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`The trees have a dark and venerable feeling to them.
            The have seen much. They know much. Too much.`)
        } else {
            println(`TBAclosed`)
        }
    },
    items: [
        {
            name: 'wind chimes',
            desc: `The wind chimes are dangling freely from the tree branches. They are made of brittle bones.`,
            onSwing: () => println(`The mischievous spirits of the forest sway the wind chimes just slightly to evade your swing.`)
        },{
            name: 'mushlings',
            desc: `"Shoom, shoom" the **mushlings** puff small spore clouds everywhere.
            They reproduce mind-bogglingly fast.`,
            onSwing: () => {
                println(`The **mushlings** shriek in terror and pop into the ground to hide.
                After a while they pop back up and continue their peaceful puffing.`)
            },
            onEat: () => {
                if (disk.inputs[disk.inputs.length-2].includes('eat mus') && disk.inputs[disk.inputs.length-3].includes('eat mus') && !disk.roomId.includes('spiritWorld')) {
                    println(`There is much wisdom in the spirit world...`)
                    enterRoom('spiritWorld1')
                    return
                }
                println(`They taste pleasantly earthly. You feel slightly better.`)
                if (player.hp <= 95) {
                    player.hp += 5
                } else {
                    player.hp = 100
                }
            },
            isTakeable: true,
        }
    ],
    exits: [
        { dir: 'west', id: 'hodrsForest6' },
        { dir: 'north', id: 'hodrsForest5' },
        { dir: 'east', id: 'hodrsForest5' },
        { dir: 'south', id: 'hodrsForest5' },
    ]
}