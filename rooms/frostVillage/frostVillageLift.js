const frostVillageLift = {
    id: 'frostVillageLift',
    area: 'Frost village',
    name: `The lift`,
    desc: `You are standing in a remarkably small lift basket beside the village wall. The basket and the whole lift mechanism is made completely out of ice.
    There's a ***lever*** on the floor.`,
    position: 'down',
    onEnter: () => {
        const room = getRoom('frostVillageLift')
        if (room.position === 'down') {
            room.exits[1].block = `You need to get to the top first!`
        } else {
            room.exits[0].block = `You need to get down first!`
        }
    },
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`TBAopen`)
        } else {
            println(`TBAclosed`)
        }
    },
    items: [
        {
            name: 'lever',
            broken: false,
            onUse: () => {
                const room = getRoom('frostVillageLift')
                if (room.position === 'down') {
                    delete room.exits[1].block
                    println(`The lift ascends with a crunch of ice.`)
                    room.desc = `You are standing in a remarkably small lift basket at the top of the village wall. The basket is made completely out of ice. 
                    There's a ***lever*** on the floor.`
                    enterRoom('frostVillageWall')
                    room.position = 'up'
                } else {
                    delete room.exits[0].block
                    println(`The lift descends with a crunch of ice.`)
                    room.desc = `You are standing in a remarkably small lift basket beside the village wall. The basket is completely out of ice. 
                    There's a ***lever*** on the floor.`
                    enterRoom('frostVillage')
                    room.position = 'down'
                }
            },
            onSwing: () => {
                const room = getRoom('frostVillageLift')
                println(`The lever shatters into pieces.`)
                if (room.position === 'down') {
                    room.items[0].broken = true
                    delete room.exits[0].block
                    println(`The head of the small **Frost Giant** appears above you on this side of the wall. The small **Frost Giant** shrieks at you in a panicked disapproval and disappears to the other side of the wall.`)
                } else {
                    println(`The small **Frost Giant** leaps to grab the handle of the axe. The silent **Giant** gives you a panicked look and shakes its head frenziedly.`)
                }
            },
            onEat: () => {
                const room = getRoom('frostVillageLift')
                if (room.position === 'down') {
                    println(`Your tongue gets stuck in the ice as you try to eat the lever.`)
                    const room = getRoom('frostVillageLift')
                    room.exits[0].block = 'Your tongue is stuck on the lever!'
                } else {
                    println(`Your tongue gets stuck in the ice as you try to eat the lever.
                    The small **Frost Giant** comes to your aid and applies some kind of red powder between your tongue and the lever.
                    The small **Giant** shakes its head disappointed.
                    Your tongue is freed instantly.`)
                }
            }
        }
    ],
    exits: [
        { dir: 'east', id: 'frostVillage' },
        { dir: 'west', id: 'frostVillageWall' }
    ]
}