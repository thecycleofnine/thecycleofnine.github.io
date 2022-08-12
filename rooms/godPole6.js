const godPole6 = {
    id: 'godPole6',
    area: 'Fisher village',
    name: `Sixth wooden pole`,
    desc: `The carving depicts a beautiful goddess wearing a feathered ***cloak***. She is riding a ***boar*** with two cats beside her, one on each side. The beautiful goddess is holding a sword and and a round shield and her hair is braided with colorful flowers and herbs.`,
    printDescriptions: true,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`You feel a wild presence. Primal even.`)
        } else {
            println(`You feel wild. Primal even. You understand that death is but a transition, which sprouts new beginnings.`)
        }
    },
    engageInCombat: () => {
        player.inCombat = true
        const room = getRoom('godPole6')
        room.desc = `The god pole has taken flight with the magical feathery ***cloak***. The boar **Hildisvini** is pawing the ground before you, preparing to charge.`
        room.exits[0].block = `The loyal boar **Hildisvini** blocks your way as you try to escape. You won't get away from this fight so easily.`
        room.exits[1].block = `The loyal boar **Hildisvini** blocks your way as you try to escape. You won't get away from this fight so easily.`
        room.exits[2].block = `The loyal boar **Hildisvini** blocks your way as you try to escape. You won't get away from this fight so easily.`
        room.exits[3].block = `The loyal boar **Hildisvini** blocks your way as you try to escape. You won't get away from this fight so easily.`
            const boar = getFoeInRoom('Boar', 'godPole6')
            boar.inCombat = true
            const freyja = getFoeInRoom('Goddess Freyja', 'godPole6')
            freyja.inCombat = true
        println(`The feathered ***cloak*** wraps itself around the god pole, which comes alive and soars up to the sky.
                The cats jump up on the other poles and the **boar** slams down to the ground before you.
                *You are now in combat with **Freyja*** and **Hildisvini** the boar.`)
    },
    items: [
        {
            name: 'cloak',
            desc: `It's a cloak made out of eagle feathers. It has some kind of magic.`,
            onSwing: () => {
                if (!player.inCombat) {
                    const room = getRoom('godPole6')
                    room.engageInCombat()
                } else {
                    const evadeMoves = [
                        `**Freyja** blocks the axe with her sword. Your ears ring from the loud clang of the weapons.`,
                        `The ***cloak*** swirls in the air to avoid the swing.`,
                        `**Freyja** block the blow with her shield to protect the ***cloak***.`
                    ]
                    const choiceIndex = Math.floor(Math.random() * (2 + 1));
                    println(evadeMoves[choiceIndex])
                }
            },
            onEat: () => {
                const room = getRoom('godPole6')
                room.engageInCombat()
            },
        },
        {
            name: 'boar',
            desc: `The loyal boar has sharp tusks.`,
            onSwing: () => {
                if (!player.inCombat) {
                    const room = getRoom('godPole6')
                    room.engageInCombat()
                }
            },
            onEat: () => {
                if (!player.inCombat) {
                    const room = getRoom('godPole6')
                    room.engageInCombat()
                }
            },
        },
        {
            name: 'roots',
            onLook: () => {
                if (player.inCombat) {
                    println(`The small roots are grabbing you by your feet to keep you from moving.`)
                } else {
                    println(`There is no such thing here.`)
                }
            },
            onSwing: () => {
                if (player.inCombat) {
                    println(`The roots let go of your feet as they get cut.`)
                    const room = getRoom('godPole6')
                    room.items = room.items.filter(i => i.name !== 'roots')
                } else {
                    println(`There is no such thing here.`)
                }
            },
            onEat: () => {
                if (player.inCombat) {
                    const room = getRoom('godPole6')
                    println(`The roots let go of your feet as they are devoured.`)
                    room.items = room.items.filter(i => i.name !== 'roots')
                } else {
                    println(`There is no such thing here.`)
                }
            },
        }
    ],
    foes: [
        {
            name: ['Boar', 'The boar', 'Hildisvini'],
            hp: 70,
            alive: true,
            inCombat: false,
            isArmed: true,
            freyjaAlive: true,
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
                const room = getRoom('godPole6')
                room.engageInCombat()
            },
            hitDescriptions: [
                `The axe cuts off a slice of tusk, which is sent flying accross the Fisher village square.`,
                `It connects and you feel a rib snapping under the weight of the blow.`,
                `Blood gushes out as you cut deep into the boarskin.`,
                `The swing slices off an ear. There's an earsplitting squeal.`,
                `An ear of the boar gets sliced off. **Hildisvini** squeals in agony.`,
                `The back of the boar is broken as your axe swings into the frenzied animal.`,
                `You hear an audible crack as the blow connects with the head of the wild boar.`,
                `There's a splatter of blood and the boar stumbles from the hit.`,
                `A leg bone shatters from the force of the swing.`,
                `The boar tries to evade by backing up but the blade connects painfully with the trunk of the boar.`,
                `There's a loud squeal as the axe slams into the ribcage of the boar.`
            ],
            missDescriptions: this.freyjaAlive ? [
                // freyja alive
                `The boar blocks the blow with its tusks.`,
                `The boar jumps away from the blade just in time.`,
                `**Hildisvini** barely escapes the swing by rolling to the side.`,
                `The animal manages to tackle you right before the hit to avoid any damage.`,
                `But you lose your footing and fall as the boar charges straight for you in the middle of the swing.`,
                `The boar anticipates your movements and jumps away from you.`,
                `**Freyja** comes in to block the blow with her shield.`,
                `The shield of **Freyja** protects the boar as she flies between you and **Hildisvini**.`,
            ] : [
                // freyja dead
                `The boar blocks the blow with its tusks.`,
                `The boar jumps away from the blade just in time.`,
                `**Hildisvini** barely escapes the swing by rolling to the side.`,
                `The animal manages to tackle you right before the hit to avoid any damage.`,
                `But you lose balance and fall as the boar charges straight for you in the middle of the swing.`,
                `The boar anticipates your movements and jumps away from you.`,
            ],
            attackDescriptions: this.freyjaAlive ? [
                // freyja alive
                `The tusks of the boar scrape you painfully.`,
                `**Freyja** swoops in and slices you with her sword.`,
                `**Freyja** charges at you from above with her blade and manages to slit you in the neck.`,
                `**Hildisvini** slams its boar tusks hard into your leg.`,
                `**Freyja** seizes the opportunity and cuts into your arm with her sword.`,
                `The goddess **Freyja** rams you down with her shield.`,
                `You feel immense pain as the sword of **Freyja** pierces your leg.`,
                `The sword of **Freyja** cleaves your tricep causing great injury.`,
                `**Freyja** slashes you with her sword seemingly out of nowhere causing you to flinch.`,
                `**Freyja** rings your temple with the edge of her shield.
                You see stars for a moment.`,
                `The goddess **Freyja** lands a devastating blow to your back from behind you.`
            ] : [
                // freyja dead
                `The tusks of the boar scrape you painfully.`,
                `**Hildisvini** slams its boar tusks hard into your leg.`,
                `The boar hits you hard in the pelvis with its tusks.`,
                `**Hildisvini** gores you with its sharp tusks. The pain is blinding.`,
                `The animal bites into your calf in a frenzy.`,
                `Pain shoots through your spine as **Hildisvini** rams you down to the ground.`,
                `The boar kicks you with all its might using its hind legs.`,
                `You are sent flying as the strong boar rushes into your side.`
            ],
            onDeath: () => {
                const boar = getFoeInRoom('Boar', 'godPole6')
                boar.alive = false
                const freyja = getFoeInRoom('Goddess Freyja', 'godPole6')
                freyja.boarAlive = false
                const room = getRoom('godPole6')
                println(`**Hildisvini** squeals loudly as their ***Keho*** fails them. The ***boar*** rolls to the ground lifeless like a sack of flour.
                **Freyja** lets out a despairing shrill and charges straight at you from the air.`)
                room.desc = `Where once was a god pole dedicated to the goddess **Freyja** now lies a feast for the crows.`
                room.exits[0].block = `**Freyja** swoops in before you as you try to escape. She won't let you get away after killing her **Hildisvini**.`
                room.exits[1].block = `**Freyja** swoops in before you as you try to escape. She won't let you get away after killing her **Hildisvini**.`
                room.exits[2].block = `**Freyja** swoops in before you as you try to escape. She won't let you get away after killing her **Hildisvini**.`
                room.exits[3].block = `**Freyja** swoops in before you as you try to escape. She won't let you get away after killing her **Hildisvini**.`
                const boarItem = getItemInRoom('boar', 'godPole6')
                boarItem.desc = `The loyal boar is dead. It's lying on the ground lifeless.`
                boar.desc = `The loyal boar is dead. It's lying on the ground lifeless.`
                boarItem.onSwing = () => println(`You are defiling the corpse of **Hildisvini**, the loyal boar!`)
                boarItem.onEat = () => {
                    player.hp = 100
                    println(`You eat wooden flesh straight out of the divine boar's carcass.
                    Your spirit ***Henki*** has been restored to full HP!`)
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
            boarAlive: true,
            onLook: () => {
                const freyja = getFoeInRoom('Goddess Freyja', 'godPole6');
                if (player.inCombat) {
                    if (freyja.hp >= 70) {
                        println(`The beautiful **Freyja** has a wild expression on her face. She is ready to strike you down with her shining sword.`)
                    } else if (freyja.hp < 70 && freyja.hp > 30) {
                        println(`You have hurt the pride of the goddess. She looks vengeful.`)
                    } else {
                        println(`The goddess is panting. Her form is beginning to show weakness.`)
                    }
                } else {
                    const room = getRoom('godPole6')
                    println(room.desc)
                }
            },
            onEngage: () => {
                const room = getRoom('godPole6')
                room.engageInCombat()
            },
            hitDescriptions: [
                `**Freyja** flew too low and you manage to ring her temple with the axe. She looks livid.`,
                `It strikes above **Freyja's** shield causing great damage.`,
                `**Freyja** blocks with her sword but you manage to slide the axe straight into her arm.`,
                `The axe draws blood as the blade bites into the shoulder of the goddess.`,
                `The goddess tries to block with her shield but the blow is too quick.
                You cut to the side of the goddess.`,
                `There's a swift twirl of feathers as **Freyja** flies away with the cloak but you feel the blow connecting barely.`,
                `The blade slits her leg as she makes quick movements in the air around you.`,
                `A devastating blow crushes her kneecap in the air.`,
                `The axe hits her in the ankle as she flies over you.`,
                `You aim high and find an opening between her shield and sword.
                Blood drips from her wound on your face.`,
                `Your axe catches the goddess mid-air as she flies by, causing her to fall to the ground.`,
                `**Freyja** flies straight up to evade the swing but her leg gets chopped off below the calf.`,
                `The blow slices through her shield and cuts into the chest of the goddess.`,
                `You hit **Freyja** into the inner bicep causing a nasty wound.`,
                `You ruffle her feathers by landing a blow directly into her forehead.`
            ],
            missDescriptions: [
                `**Freyja** swirls around in the air with her cloak to avoid the blow.`,
                `The goddess moves to block the blow with her round shield.`,
                `There's only a graceful flutter of feathers as **Freyja** uses her ***cloak*** to disappear from your sight momentarily.`,
                `The shield of the goddess is too quick and deflects the swing away from her.`,
                `There's a loud clang as **Freyja** blocks the axe with her sword.`,
                `She quickly points her sword directly at your neck forcing you to stop the swing midway and step back.`,
                `Her rhythm of movement in the air is too disorienting and you miss embarassingly.`,
                `**Freyja** causes you to stop as ***roots*** are growing from the ground around your feet!`,
                `But you are completely blind!
                You regain your vision after a couple of seconds as the magic spell wanes.`,
                `But you don't know which side is up and which side is down!
                You get up from the ground as the magic spell wanes.`,
                `Your weapons meet with a deafening clang, and the nimble **Freyja** gains the upper hand.`
            ],
            attackDescriptions: this.boarAlive ? [
                // Hildisvini alive
                `The boar **Hildisvini** seizes the moment and sinks its teeth into your leg.`,
                `She rams into you with her shield in a frenzy, causing some nasty bludgeoning damage.`,
                `**Hildisvini** tackles you from behind as your focus is elsewhere.`,
                `The boar charges at you causing you to trip as you evade and you hit your head.`,
                `You hear a chiming sound as **Freyja** activates a baneful jinx causing you to cough up blood.`,
                `**Freyja** mutters something and you feel as if all your limbs are torn off.`,
                `The goddess casts a hex on you causing your skin to develop painful boils, which explode painfully.`,
                `Your ears start to bleed as **Freyja** hexes your brain.`,
                `You feel untolerable pain as your limbs start to dislocate on their own for some reason.`,
                `There is sharp pain as **Hildisvini** sinks its tusks deep into your calf from behind.`
            ] : [
                // Hildisvini dead
                `She rams into you with her shield in a frenzy, causing some nasty bludgeoning damage.`,
                `You hear a chiming sound as **Freyja** activates a baneful jinx causing you to cough up blood.`,
                `**Freyja** mutters something and you feel as if all your limbs are torn off.`,
                `The goddess casts a hex on you causing your skin to develop painful boils.`,
                `Your ears start to bleed as **Freyja** hexes your brain.`,
                `You feel untolerable pain as your limbs start to dislocate on their own for some reason.`,
            ],
            onDeath: () => {
                const boar = getFoeInRoom('Boar', 'godPole6')
                boar.freyjaAlive = false
                const freyja = getFoeInRoom('Goddess Freyja', 'godPole6')
                freyja.alive = false
                const room = getRoom('godPole6')
                println(`The goddess **Freyja** crashes hard down to the ground lifeless.`)
                // TBA add Freyja character to Hel
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