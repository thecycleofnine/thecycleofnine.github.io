const frostVillageLift = {
    id: 'frostVillageLift',
    area: 'Frost village',
    name: `The lift`,
    desc: `You are standing in a remarkably small lift beside the village wall. The whole lift mechanism is made completely out of ice.
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
                    println(`The lift ascends with the sound of crunching ice.`)
                    room.desc = `You are standing in a remarkably small lift at the top of the village wall. 
                    There's a ***lever*** on the icy floor.`
                    enterRoom('frostVillageWall')
                    room.position = 'up'
                } else {
                    delete room.exits[0].block
                    println(`The lift ascends with the sound of crunching ice.`)
                    room.desc = `You are standing in a remarkably small lift at the foot of the village wall. 
                    There's a ***lever*** on the icy floor.`
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
                    println(`The head of the small **Frost Giant** peeks over the ledge at the top of the wall. It shrieks at you with a panicked voice, and disappears to the other side of the wall.`)
                } else {
                    println(`The small **Frost Giant** leaps quickly to grab the handle of the axe to stop you from striking. 
                    The silent **Giant** gives you a panicked look and shakes its head as it lets go of the axe.`)
                }
            },
            onEat: () => {
                const room = getRoom('frostVillageLift')
                if (room.position === 'down') {
                    println(`Your tongue gets stuck on the ice as you try to eat the lever.`)
                    const room = getRoom('frostVillageLift')
                    room.exits[0].block = `You can't move. Your tongue is stuck on the icy lever!`
                } else {
                    println(`Your tongue gets stuck on the ice as you try to eat the lever.
                    The small **Frost Giant** comes to your aid, and applies some kind of red powder between your tongue and the lever. It shakes its head in disappointment.
                    Your tongue is instantly freed from the lever.`)
                }
            }
        }
    ],
    exits: [
        { dir: 'east', id: 'frostVillage' },
        { dir: 'west', id: 'frostVillageWall' }
    ]
}