const godPole6 = {
    id: 'godPole6',
    area: 'Fisher village',
    name: `Sixth wooden pole`,
    desc: `The carving depicts a beautiful goddess wearing a feathered ***cloak***. She is riding a ***boar*** with two cats beside her, one on each side. The beautiful goddess is holding a sword and and a round shield and her hair is braided with colorful petals and herbs.`,
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
        room.items = room.items.filter(i => i.name !== 'boar')
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
                if (!boar.alive) {
                    println(`The wooden carcass of the loyal boar **Hildisvini** lies lifeless on the ground.`)
                    return
                }
                if (player.inCombat) {
                    if (boar.hp >= 50) {
                        println(`Steam is bursting out of the nostrils of **Hildisvini**.
                        The boar is determined to protect its friend.`)
                    } else if (boar.hp < 40 && boar.hp > 10) {
                        println(`**Hildisvini** is taking deep wheezing breaths. The boar seems fatigued.`)
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
                `Your axe swings into the backbone of the frenzied animal. It breaks with a nasty crack.`,
                `You hear an audible crack as the blow connects with the head of the wild boar.`,
                `There's a splatter of blood and the boar stumbles from the hit.`,
                `A leg bone shatters from the force of the swing.`,
                `The boar tries to evade by backing up but the blade connects painfully with the trunk of the boar.`,
                `There's a loud squeal as the axe slams hard into the ribcage of the boar.`
            ],
            missDescriptions: [
                // freyja alive
                `The boar blocks the blow with its tusks.`,
                `The boar jumps away from the blade just in time.`,
                `**Hildisvini** barely escapes the swing by rolling to the side.`,
                `The animal manages to tackle you right before the hit to avoid any damage.`,
                `But you lose your footing and fall as the boar charges straight for you in the middle of the swing.`,
                `The boar anticipates your movements and jumps away from you.`,
                `**Freyja** comes in to block the blow with her shield.`,
                `The shield of **Freyja** protects the boar as she flies between you and **Hildisvini**.`,
            ],
            missDescriptionsFreyjaDead: [
                // freyja dead
                `The boar blocks the blow with its tusks.`,
                `The boar jumps away from the blade just in time.`,
                `**Hildisvini** barely escapes the swing by rolling to the side.`,
                `The animal manages to tackle you right before the hit to avoid any damage.`,
                `But you lose balance and fall as the boar charges straight for you in the middle of the swing.`,
                `The boar anticipates your movements and jumps away from you.`,
            ],
            attackDescriptions: [
                // freyja alive
                `The tusks of the boar scrape you painfully.`,
                `**Freyja** swoops in and slices you from behind with her sword.`,
                `**Freyja** charges at you from above with her blade and manages to slit you in the neck.`,
                `**Hildisvini** slams its boar tusks hard into your leg.`,
                `**Freyja** seizes the opportunity and cuts into your arm with her sword.`,
                `**Freyja** rams you down from behind with her shield.`,
                `You feel immense pain as the sword of **Freyja** pierces through your leg from behind.`,
                `The sword of **Freyja** cleaves your tricep causing great injury.`,
                `**Freyja** slashes you with her sword seemingly out of nowhere causing you to flinch.`,
                `The goddess **Freyja** lands a devastating blow to your back from behind you.`
            ],
            attackDescriptionsFreyjaDead: [
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
                freyja.attackDescriptions = freyja.attackDescriptionsBoarDead
                const room = getRoom('godPole6')
                println(`The lifeless ***boar*** falls to the ground like a sack of flour.
                **Freyja** lets out a despairing shrill and charges straight at you from the air.`)
                room.desc = `Where once was a god pole dedicated to the goddess **Freyja** now lies a feast for the crows.`
                room.exits[0].block = `**Freyja** swoops in before you as you try to escape. She won't let you get away after killing her **Hildisvini**.`
                room.exits[1].block = `**Freyja** swoops in before you as you try to escape. She won't let you get away after killing her **Hildisvini**.`
                room.exits[2].block = `**Freyja** swoops in before you as you try to escape. She won't let you get away after killing her **Hildisvini**.`
                room.exits[3].block = `**Freyja** swoops in before you as you try to escape. She won't let you get away after killing her **Hildisvini**.`
                boar.desc = `The loyal boar is dead. It's lying on the ground lifeless.`
                boar.onSwing = () => println(`You are defiling the corpse of **Hildisvini**, the loyal boar!`)
                boar.onEat = () => {
                    player.hp = 100
                    if (player.inCombat) {
                        println(`You take a hurried bite straight out of the divine ***boar***'s wooden carcass.
                        Your spirit ***Henki*** has been restored to full HP!`)
                    } else {
                        println(`You eat wooden flesh straight out of the divine ***boar***'s carcass.
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
            hp: 200,
            alive: true,
            inCombat: false,
            isArmed: true,
            boarAlive: true,
            onLook: () => {
                const freyja = getFoeInRoom('Goddess Freyja', 'godPole6');
                if (!freyja.alive) {
                    println(`The wooden god pole lies broken on the ground.
                    It was a formidable foe.
                    Two wooden cats have curled up on it.`)
                    return
                }
                if (player.inCombat) {
                    if (freyja.hp >= 70) {
                        println(`The beautiful **Freyja** has a wild expression on her face as she swirls through the air with her feathered ***cloak***. She is ready to strike you down with her shining sword.`)
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
                `It strikes below **Freyja's** shield causing brutal damage to her abdomen.`,
                `**Freyja** blocks with her sword but you manage to slide the axe straight into her arm.`,
                `The axe draws blood as the blade bites into the shoulder of the goddess.`,
                `The goddess tries to block with her shield but the blow is too quick.
                You cut to the side of the goddess.`,
                `The feather ***cloak*** twirls swiftly as **Freyja** tries to evade but you feel the blow connecting somewhere between the feathers.`,
                `The blade slits her leg as she makes quick movements in the air around you.`,
                `A devastating blow crushes her kneecap in the air.`,
                `The axe hits her in the ankle as she tries to fly over you.`,
                `You aim high and find an opening between her shield and sword.
                Blood drips from her wound on your face.`,
                `Your axe catches the goddess mid-air as she flies by, causing her to fall to the ground.`,
                `**Freyja** flies straight up to evade the swing but her leg takes a direct hit.`,
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
                `She quickly points her sword directly at your throat forcing you to stop the swing midway and step back.`,
                `Her rhythm of movement in the air is too disorienting and you miss embarassingly.`,
                `But you stop on your tracks because ***roots*** are growing from the ground around your feet!`,
                `But you are completely blind!
                You regain your vision after a couple of seconds as the seiðr magic wanes.`,
                `But you don't know which side is up and which side is down!
                You get up from the ground as the seiðr magic wanes.`,
                `Your weapons meet with a deafening clang, and the nimble **Freyja** gains the upper hand.`,
                `The wily **Freyja** feints to the side but switches direction at the last second to avoid the swing.`
            ],
            attackDescriptions: [
                // Hildisvini alive
                `The boar **Hildisvini** seizes the moment and sinks its teeth into your leg.`,
                `**Freyja** rams into you with her shield in a frenzy, causing some nasty bludgeoning damage.`,
                `**Hildisvini** tackles you from behind as your focus is elsewhere.`,
                `The **Boar** charges at you causing you to trip as you evade and you hit your head.`,
                `You hear a chiming sound as **Freyja** activates a baneful jinx causing you to cough up blood.`,
                `**Freyja** mutters something and you feel as if all your limbs are torn off.`,
                `The goddess casts a hex on you causing your skin to develop painful exploding boils.`,
                `Suddenly your ears start bleeding heavily as **Freyja** throws a hex at you.`,
                `You feel untolerable pain as your limbs start to dislocate by seiðr magic.`,
                `There is sharp pain as **Hildisvini** sinks its tusks deep into your calf from behind.`
            ],
            attackDescriptionsBoarDead: [
                // Hildisvini dead
                `**Freyja** rams into you with her shield in a frenzy, causing some nasty bludgeoning damage.`,
                `You hear a chiming sound as **Freyja** activates a baneful jinx causing you to cough up blood.`,
                `**Freyja** mutters something and you feel as if all your limbs are torn off.`,
                `The goddess casts a hex on you causing your skin to develop painful exploding boils.`,
                `Suddenly your ears start bleeding heavily as **Freyja** throws a hex at you.`,
                `You feel untolerable pain as your limbs start to dislocate on their own for some reason.`,
                `The whole village gasps as **Freyja** delivers a colossal blow to your head.`,
                `The goddess throws a monolithic strike into your abdomen.`,
                `Blood rushes into your throat as **Freyja** flogs you with her sword.`,
                `**Freyja** rings your temple with the edge of her shield.
                You see only stars for a moment.`,
            ],
            onDeath: () => {
                const freyja = getFoeInRoom('Goddess Freyja', 'godPole6')
                freyja.alive = false
                const boar = getFoeInRoom('Boar', 'godPole6')
                boar.attackDescriptions = boar.attackDescriptionsFreyjaDead
                boar.missDescriptions = boar.missDescriptionsFreyjaDead
                const room = getRoom('godPole6')
                println(`The **Goddess Freyja** loses her Henki spirit and crashes down hard, lifeless.`)
                // TBA add Freyja character to Hel
                room.desc = `Where once was a god pole dedicated to the goddess **Freyja** now lies a feast for the crows.`
                const cloakItem = getItemInRoom('cloak', 'godPole6')
                cloakItem.name = `Feather cloak`
                cloakItem.desc = `It was won in battle. It's made out of feathers and it can be used to ***fly to*** places on your ***Map***.`
                cloakItem.onSwing = () => {
                    println(`The cloak gets sliced to pieces!`)
                    disk.inventory = disk.inventory.filter(i => i.name !== 'Feather cloak')
                }
                cloakItem.onEat = () => {
                    println(`You munch on the corner of the ***Feather cloak***. It tastes like freedom.`)
                }
                disk.inventory.push(cloakItem)
                println(`*A **Feather cloak** has been added to your inventory.*`)
                room.items = room.items.filter(i => i.name !== 'roots')
                room.items = room.items.filter(i => i.name !== 'cloak')
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