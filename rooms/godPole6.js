const godPole6 = {
    id: 'godPole6',
    name: `Sixth wooden pole`,
    desc: `The carving depicts a beautiful goddess wearing a feathered ***cloak***. She is riding a ***boar*** with two cats beside her, one on each side. The beautiful goddess is holding a sword and and a shield and her hair is braided with colorful flowers and herbs.`,
    printDescriptions: true,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`You feel a wild presence. Primal even.`)
        } else {
            println(`You feel wild. Primal even. You understand that death is but a transition, which sprouts new beginnings.`)
        }
    },
    engageInCombat: (name) => {
        const room = getRoom('godPole6')
        room.desc = `The god pole has taken flight with the magical feathery cloak. The boar **Hildisvini** is pawing the ground before you, preparing to charge.`
        room.exits[0].block = `The loyal boar **Hildisvini** blocks your way as you try to escape. You won't get away from this fight so easily.`
        room.exits[1].block = `The loyal boar **Hildisvini** blocks your way as you try to escape. You won't get away from this fight so easily.`
        room.exits[2].block = `The loyal boar **Hildisvini** blocks your way as you try to escape. You won't get away from this fight so easily.`
        room.exits[3].block = `The loyal boar **Hildisvini** blocks your way as you try to escape. You won't get away from this fight so easily.`
        if (name === 'freyja') {
            const freyja = getFoeInRoom('Goddess Freyja', 'godPole6')
            freyja.onEngage()
            const boar = getFoeInRoom('boar', 'godPole6')
            boar.inCombat = true
        }
        if (name === 'boar') {
            const boar = getFoeInRoom('boar', 'godPole6')
            boar.onEngage()
            const freyja = getFoeInRoom('Goddess Freyja', 'godPole6')
            freyja.inCombat = true
        }
    },
    items: [
        {
            name: 'cloak',
            desc: `It's a cloak made out of eagle feathers. It has some kind of magic.`,
            onSwing: () => {
                if (!player.inCombat) {
                    const room = getRoom('godPole6')
                    room.engageInCombat('freyja')
                } else {
                    // TBA swing at freyja
                }
            },
            onEat: () => {
                const room = getRoom('godPole6')
                room.engageInCombat('freyja')
            },
        },
        {
            name: 'boar',
            desc: `The loyal boar has sharp tusks.`,
            onSwing: () => {
                if (!player.inCombat) {
                    const room = getRoom('godPole6')
                    room.engageInCombat('boar')
                }
            },
            onEat: () => {
                if (!player.inCombat) {
                    const room = getRoom('godPole6')
                    room.engageInCombat('boar')
                }
            },
        }
    ],
    foes: [
        {
            name: ['boar', 'The boar', 'Hildisvini'],
            hp: 70,
            alive: true,
            inCombat: false,
            isArmed: true,
            onLook: () => {
                const boar = getRoom('godPole6').foes[0];
                if (player.inCombat) {
                    if (boar.hp >= 50) {
                        println(`Steam is bursting out of the nostrils of **Hildisvini**.
                        The boar is determined to protect its friend.`)
                    } else if (boar.hp < 40 && boar.hp > 10) {
                        println(`**Hildisvini** is taking deeper breaths. It seems fatigued.`)
                    } else {
                        println(`**Hildisvini** is wounded badly. It's confused and disoriented.`)
                    }
                } else {
                    const boar = getItemInRoom('boar', 'godPole6')
                    println(boar.desc)
                }
            },
            onEngage: () => {
                const boar = getFoeInRoom('boar', 'godPole6')
                boar.inCombat = true
                player.inCombat = true
                println(`The feathered ***cloak*** wraps itself around the god pole, which comes alive and soars up to the sky.
                    The cats jump up on the other poles and the **boar** slams down to the ground before you.
                    *You are now in combat with **Freyja*** and **Hildisvini** the boar.`)
            },
            hitDescriptions: [
                `The axe cuts off a slice of tusk, which is sent flying accross the Fisher village square.`,
                `It connects and you feel a rib snapping under the weight of the blow.`,
                `Blood gushes out as you cut deep into the boarskin.`,
                `The swing slices off an ear. There's an earsplitting squeal.`,
                `A boar ear gets sliced off. **Hildisvini** squeals in agony.`,
                `The back of the boar is broken as your axe swings into the frenzied animal.`,
                `You hear a crack as the blow connects with the head of the wild boar.`,
                `There's a splatter of blood and the boar stumbles from the hit.`,
                `A leg bone shatters from the force of the swing.`,
                `The boar tries to evade by backing up but the blade connects painfully with the trunk of the boar.`,
                `There's a loud squeal as the axe slams into the ribcage of the boar.`
            ],
            missDescriptions: [
                `The boar blocks the blow with the tusks.`,
                `The boar jumps away from the blade just in time.`,
                `**Hildisvini** barely escapes the swing by rolling to the side.`,
                `The animal manages to tackle you right before the hit to avoid any damage.`,
                `But you lose balance and fall as the boar charges straight for you in the middle of the swing.`,
                `The boar anticipates your movements and jumps away from you.`,
                `**Freyja** comes in to block the blow with her shield.`,
                `The shield of **Freyja** protects the boar as she flies between you and **Hildisvini**.`,
            ],
            attackDescriptions: [
                `The tusks of the boar scrape you painfully.`,
                `**Freyja** swoops in and slices you with her sword.`,
                `as **Freyja** charges at you from above with her blade.`,
                `**Hildisvini** slams its boar tusks hard into your leg.`,
                `**Freyja** cuts into your arm with her sword.`
            ],
            onDeath: () => {
                const boar = getFoeInRoom('boar', 'godPole6')
                boar.alive = false
                const freyja = getFoeInRoom('Goddess Freyja', 'godPole6')
                const room = getRoom('godPole6')
                println(`**Hildisvini** squeals loudly as their ***Keho*** fails them. The ***boar*** rolls to the ground lifeless like a sack of flour.
                **Freyja** lets out a despairing shrill and charges straight at you from the air.`)
                delete room.foes[0]
                room.desc = `Where once was a god pole dedicated to the goddess **Freyja** now lies a feast for the crows.`
                room.exits[0].block = `**Freyja** swoops in before you as you try to escape. She won't let you get away after killing her **Hildisvini**.`
                room.exits[1].block = `**Freyja** swoops in before you as you try to escape. She won't let you get away after killing her **Hildisvini**.`
                room.exits[2].block = `**Freyja** swoops in before you as you try to escape. She won't let you get away after killing her **Hildisvini**.`
                room.exits[3].block = `**Freyja** swoops in before you as you try to escape. She won't let you get away after killing her **Hildisvini**.`
                const boarItem = getItemInRoom('boar', 'godPole6')
                boarItem.desc = `The loyal boar is dead. It's lying on the ground lifeless.`
                boarItem.onSwing = () => println(`You are defiling the corpse of **Hildisvini**, the loyal boar!`)
                boarItem.onEat = () => {
                    if (player.inCombat) {
                        println(`You take a hurried bite out of the wooden carcass of the divine ***boar***.
                        Your spirit ***Henki*** gains 15 HP!`)
                        if (player.hp + 15 <= 100) {
                            player.hp += 15
                        } else {
                            player.hp = 100
                        }
                    } else {
                        player.hp = 100
                        println(`You eat wooden flesh straight out of the divine boar's carcass.
                        Your spirit ***Henki*** has been restored to full HP!`)
                    }
                }
                if (!freyja.alive) {
                    player.inCombat = false
                    room.exits.forEach(e => delete e.block)
                }
            },
        },
        {
            name: ['Goddess Freyja', 'Freyja', 'The goddess', 'Goddess'],
            hp: 150,
            alive: true,
            inCombat: false,
            isArmed: true,
            onLook: () => {
                const freyja = getFoeInRoom('Goddess Freyja', 'godPole6');
                if (player.inCombat) {
                    if (freyja.hp >= 70) {
                        println(`TBA: describe good health lookAt`)
                    } else if (boar.hp < 70 && boar.hp > 20) {
                        println(`TBA: describe mid health lookAt`)
                    } else {
                        println(`TBA: describe low health lookAt`)
                    }
                } else {
                    const room = getRoom('godPole6')
                    println(room.desc)
                }
            },
            onEngage: () => {
                const freyja = getFoeInRoom('Goddess Freyja', 'godPole6')
                freyja.inCombat = true
                player.inCombat = true
                println(`The feathered ***cloak*** wraps itself around the god pole, which comes alive and soars up to the sky.
                    The cats jump up on the other poles and the **boar** slams down to the ground before you.
                    *You are now in combat with **Freyja*** and **Hildisvini** the boar.`)
            },
            hitDescriptions: [
                `TBA`,
                `TBA`,
            ],
            missDescriptions: [
                `TBA`,
                `TBA`,
            ],
            attackDescriptions: [
                `TBA`,
                `TBA`,
            ],
            onDeath: () => {
                const boar = getFoeInRoom('boar', 'godPole6')
                freyja.alive = false
                const freyja = getFoeInRoom('Goddess Freyja', 'godPole6')
                const room = getRoom('godPole6')
                println(`TBA: Describe death of Freyja`)
                delete room.foes[1]
                room.desc = `Where once was a god pole dedicated to the goddess **Freyja** now lies a feast for the crows.`
                const cloakItem = getItemInRoom('cloak', 'godPole6')
                cloakItem.name = `Feather cloak`
                cloakItem.desc = `It's **Freyja's** cloak made out of feathers. It can be used to ***fly to*** places on the ***map***.`
                cloakItem.onSwing = () => {
                    println(`The cloak gets sliced to pieces!`)
                    disk.inventory = disk.inventory.filter(i => i.name !== 'Feather cloak')
                }
                cloakItem.onEat = () => {
                    println(`You munch on the corner of **Freyja's** ***Feather cloak***. It tastes like freedom.`)
                }
                disk.inventory.push(cloakItem)
                println(`*A **Feather cloak** has been added to your inventory.*`)
                delete room.items[0]
                if (!boar.alive) {
                    player.inCombat = false
                    room.exits.forEach(e => delete e.block)
                }
            },
        }
    ],
    exits: [
        { dir: 'southeast', id: 'godPole5' },
        { dir: 'northwest', id: 'godPole7' },
        { dir: 'west', id: 'fisherVillageSquare' },
        { dir: 'northeast', id: 'fisherVillageAltar' },
    ]
}