const frostVillageWall = {
    id: 'frostVillageWall',
    name: `The Wall`,
    desc: `The lift brought you to the top of the wall. It's slippery up here. You can barely see the bronze arc to the ***west*** where you came from. Impassable mountains cover the landscape on the other side of the village from north to south. The small **Frost Giant** is sitting at the edge of the wall beside you.`,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`TBAopen`)
        } else {
            println(`TBAclosed`)
        }
    },
    items: [
        {
            name: 'Flute of Ice',
            desc: `It's a perfectly good flute for playing somber melodies.`,
            broken: false,
            onTake: () => println(`The small **Frost Giant** hugs the flute forcibly as you try to reach for it. The ***Flute of Ice*** doesn't budge. The **Giant** seems greatly offended.`),
            onEat: () => println(`The small **Frost Giant** hugs the flute forcibly as you try to reach for it. The ***Flute of Ice*** doesn't budge. The **Giant** seems greatly offended.`),
            onSwing: () => {
                const room = getRoom('frostVillageWall')
                if (!room.items[0].broken) {
                    removeCharacter('Small Frost Giant')
                    room.items[0].broken = true
                    println(`The flute breaks in half as it drops to the slippery ground.`)
                    room.exits[0].block = `The small **Frost Giant** doesn't allow you to leave before it gets revenge!`
                    room.foes[0].inCombat = true;
                    room.foes[0].desc = `The small **Frost Giant** is filled with rage. It seeks revenge with all its might.`
                    player.inCombat = true
                    println(`The confusion in the blinkless eyes of the small **Frost Giant** is turning rapidly into blind rage.
                    The **Giant** aims a ***Crossbow of Ice*** directly at you.`)
                    room.desc = `The small **Frost Giant** stands between you and the lift. It wants revenge.`
                    room.items[0].desc = `It's a broken flute made of clear ice. It once played somber melodies.`
                } else {
                    println(`It's already broken!`)
                }
            }
        },
        {
            name: 'Crossbow of Ice',
            desc: `It's a perfectly good crossbow for getting sweet sweet revenge.`,
            onTake: () => {
                if (player.hp > 15) {
                    player.hp -= 15
                    println(`The small **Frost Giant** evades your grab and shoots an ice arrow through your arm.`);
                } else {
                    println(`The small **Frost Giant** evades your grab and shoots an ice arrow into your forehead.`);
                    toValhall(room.foes[0]);
                }
            },
            onEat: () => {
                const room = getRoom('frostVillageWall')
                if (player.hp > 15) {
                    player.hp -= 15
                    println(`The small **Frost Giant** evades your grab and shoots an ice arrow through your arm.`);
                } else {
                    println(`The small **Frost Giant** evades your grab and shoots an ice arrow into your forehead.`);
                    toValhall(room.foes[0]);
                }
            },
            onSwing: () => {
                const room = getRoom('frostVillageWall');
                println(`The crossbow breaks with a mighty lash as the string snaps.`)
                const items = room.items.filter(item => item.name !== 'Crossbow of Ice')
                items[0].desc = `The tension of hatred lingers in the broken crossbow although the string has been released.`
                player.inCombat = false;
                room.foes[0].isArmed = false;
            }
        }
    ],
    foes: [
        {
            name: ['Frost Giant', 'Giant', 'Small Frost Giant', 'Frost'],
            hp: 70,
            alive: true,
            inCombat: false,
            isArmed: true,
            onLook: () => {
                const giant = getRoom('frostVillageWall').foes[0];
                if (giant.inCombat) {
                    if (giant.hp >= 50) {
                        println(`The small **Frost Giant** is furious. The **Giant**'s blinkless fiery blue gaze is highly disturbing.`)
                    } else if (giant.hp < 40 && giant.hp > 10) {
                        println(`The small **Frost Giant** is slow and wounded. It's starting to blink slowly every once in a while.`)
                    } else {
                        println(`The small **Frost Giant** is badly wounded. It's stumbling.`)
                    }
                } else if (!giant.isArmed) {
                    println(`The small **Frost Giant** is dumbfounded. It doesn't know what to do.`);
                } else {
                    println(`The small **Frost Giant** is raging with fury. It's about to attack.`)
                }
            },
            onEngage: () => {
                println(`The **Frost Giant** leaps out of the way in panic.`)
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
                `The small **Giant** parries your swing with the ***Crossbow of Ice***.`,
                `The small **Giant** leans back and evades your swing.`,
                `The small **Giant** jumps over your swing.`,
                `The small **Giant** leans to the side to evade your swing.`,
                `The small **Giant** rolls to evade your swing.`,
            ],
            attackDescriptions: [
                `The small **Giant** looses an ice arrow at your shoulder with the ***Crossbow of Ice***.`,
                `Blood fills your mouth as the ***Crossbow of Ice*** connects with your teeth.`,
                `The small **Giant** releases an ice arrow to your chest with the ***Crossbow of Ice***.`,
                `A nasty blow from the ***Crossbow of Ice*** sends a tooth flying from your mouth.`,
                `A blow from the ***Crossbow of Ice*** rings your temple.`,
                `The small **Giant** shoots an ice arrow to your knee with the ***Crossbow of Ice***.`,
            ],
            onDeath: () => {
                player.slayedGiants += 1;
                player.inCombat = false;
                const room = getRoom('frostVillageWall')
                const foe = room.foes[0];
                if (foe.isArmed) {
                    println(`The small **Frost Giant** shoots a last cold look at you and drops to the ground lifeless.`);
                    room.foes[0].onLook = () => println(`The dead **Frost Giant** is slowly decaying into ice and snow.`)
                } else {
                    println(`The blow sends the small **Frost Giant** flying from the wall.
              The **Giant** screeches loudly as it falls to the outer side of the wall.`);
                    delete room.foes
                    const gate = getRoom('frostVillageGate').items.push({
                        name: 'Dead Frost Giant',
                        desc: `The face of the dead Frost Giant is full of hatred.`,
                        onSwing: () => {
                            println(`You're defiling the body of the small **Frost Giant**!`)
                        },
                        onTake: () => {
                            println(`The body is decaying into ice and snow. It's melting through your fingers.`)
                        }
                    })
                    room.items = room.items.filter(item => item.name !== 'Crossbow of Ice')
                }
                room.desc = `It's slippery up here. You can barely see the bronze arc to the ***west*** where you came from. Impassable mountains cover the landscape on the other side of the village from north to south.`
                delete room.exits[1].block;
            },
        }
    ],
    exits: [
        { dir: 'east', id: 'frostVillageLift' },
        { dir: 'west', id: 'hel' }
    ]
}