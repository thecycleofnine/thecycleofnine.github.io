const frostLands = {
    id: 'frostLands',
    area: 'Frost lands',
    name: 'Frost lands',
    desc: `You are standing on a stunning icy plain. The sky has turned from purple to blue, and the clouds themselves seem to be frozen. The extreme cold of this land doesn't bother you, surprisingly.
    An enormous **Frost Giant** is slowly shuffling towards you.`,
    onLook: () => {
        const room = getRoom('frostLands')
        const axeOnTheGround = room.items.filter(i => i.name === 'Fine Axe').length > 0
        if (axeOnTheGround)
            room.desc = room.desc + ` There's a ***Fine Axe*** laying on the ice.`
    },
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`TBAopen`)
        } else {
            println(`TBAclosed`)
        }
    },
    foes: [
        {
            name: ['Frost Giant', 'Giant', 'Frost'],
            hp: 120,
            alive: true,
            inCombat: false,
            isArmed: true,
            onLook: () => {
                const giant = getRoom('frostLands').foes[0];
                if (giant.inCombat) {
                    if (giant.hp >= 60) {
                        println(`The **Frost Giant** is towering over you with the nasty-looking ***Club of Blight*** ready in hand. The **Giant**'s blinkless blue gaze is highly disturbing.`)
                    } else if (giant.hp < 60 && giant.hp > 20) {
                        println(`The **Frost Giant** is slow and wounded. It's starting to blink, every once in a while.`)
                    } else {
                        println(`The **Frost Giant** is badly wounded. It's stumbling on the bloodstained ice, its gaze hollow and dim.`)
                    }
                } else if (!giant.isArmed) {
                    println(`The enormous **Frost Giant** has entirely lost its will to fight. It's crouching on a broken artifact of deep sentimental value. It's painful to watch.`);
                } else {
                    println(`It's a slow **Frost Giant** about three meters tall. It's shuffling on the ice on its bare feet, its skin pale as snow. It's holding a ***Club of Blight***.`)
                }
            },
            onEngage: () => {
                const room = getRoom('frostLands')
                room.foes[0].inCombat = true;
                player.inCombat = true;
                println(`You try to swing high, but the axe only reaches the **Giant**'s hip.`)
                println(`The tall **Frost Giant** doesn't notice you at first. There's growling as it's trying to locate the source of its pain.`)
                room.desc = `There's a pale **Frost Giant** towering right in front of you. It's at least three meters tall.`
            },
            hitDescriptions: [
                `Your axe cuts deep into the **Giant**'s knee.`,
                `The axe sinks into the **Frost Giant**'s calf.`,
                `You slice a chunck of ice off the **Giant**'s leg.`,
                `The axe cuts off a chip of ice from the **Giant**'s face.`,
                `The axe splits a tendon in the **Giant**'s calf.`,
                `You remove a sheet of ice from the **Giant**'s thigh.`,
                `Blue lifeblood gushes out from the **Giant**'s side.`,
                `The blow is devastating. The **Giant** stumbles on its feet.`,
            ],
            missDescriptions: [
                `The **Giant** blocks your swing with the ***Club of Blight***.
          A shimmering sound fills the air as the weapons clang together.`,
                `The **Giant** leans back and evades your swing.`,
                `The **Giant** leans to the side to evade your swing.`,
                `The **Giant** raises its leg to evade your swing.`,
            ],
            attackDescriptions: [
                `The **Giant** crushes your shoulder with the ***Club of Blight***.`,
                `Blood fills your mouth as the ***Club of Blight*** connects with your teeth.`,
                `The **Giant** slams the ***Club of Blight*** into your ribcage.`,
                `A blow from the ***Club of Blight*** sends you flying into the ground.`,
                `A blow from the ***Club of Blight*** rings your temple.`,
            ],
            onDeath: () => {
                player.slayedGiants += 1;
                player.inCombat = false;
                const room = getRoom('frostLands')
                const foe = room.foes[0];
                room.desc = `The icy landscape is beautifully bare. The clear blue skies stand still. There's a dead **Frost Giant** laying on the ice. 
                A bronze ***arc*** stands tall to the ***west***.`
                if (foe.isArmed) {
                    println(`The **Frost Giant** groans in deep, harmonious sounds, and drops to the ground lifeless.`);
                    room.foes[0].onLook = () => println(`The dead **Frost Giant** is slowly decaying into ice and snow.`)
                } else {
                    println(`You decapitate the crouching **Frost Giant**. The head falls to the ground with a thump.`);
                    room.foes[0].onLook = () => println(`The dead **Frost Giant** is slowly decaying into ice and snow. Its separated head still stares at you.`)
                    room.desc = `The icy landscape is beautifully bare. The clear blue skies stand still. There's a decapitated **Frost Giant** laying on the ice.
                    A bronze ***arc*** stands tall to the ***west***.`
                }
                delete room.exits[1].block;
            },
        }
    ],
    items: [
        {
            name: 'Club of Blight',
            desc: `It's formed from the frozen breath of an enormous giant. It's lumpy.`,
            onSwing: () => {
                println(`The ***Club of Blight*** shatters into hundreds of pieces.
                The **Frost Giant** looks at its empty hands in bewilderment. It tries to gather the broken pieces from the ground in a desperate effort to mend the weapon.`)
                const room = getRoom('frostLands')
                room.items = room.items.filter(item => item.name !== 'Club of Blight');
                const giant = room.foes[0];
                giant.isArmed = false;
                giant.inCombat = false;
                player.inCombat = false;
                room.desc = `The icy landscape is beautifully bare. The clear blue skies stand still. 
                There's an empty-handed **Frost Giant** crouching before you. It's weeping and moaning.
                A bronze ***arc*** stands tall to the ***west***.`
                delete room.exits[1].block;
            },
        },
        {
            name: 'arc',
            desc: `The arc is masterfully constructed. The bronze surface has peculiar carvings all over it. They seem to move slowly. The metal itself seems to be in constant stationary movement.`
        },
    ],
    exits: [
        { dir: 'west', id: 'mountainPeak' },
        { dir: 'east', id: 'roadToFrostVillage', block: 'The **Frost Giant** blocks your way.' }
    ],
}