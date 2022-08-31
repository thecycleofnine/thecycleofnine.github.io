const insideHut = {
    id: 'insideHut',
    area: 'Mountain of beginnings',
    name: 'Inside the hut',
    desc: `You enter the hut. The runes emit a menacing glow as you walk past them.`,
    onEnter: () => {
        const room = getRoom('insideHut');
        const nextTo = getRoom('nextToHut')
        nextTo.desc = `There's a small pine hut with slightly curved walls. Its ***entrance*** is to the ***south***.
      You can almost see the top of the mountain to the ***east*** from here.
      You notice the **Bearded Fellow** striding towards you menacingly.`
        nextTo.exits.forEach(exit => exit.block = `The **Bearded Fellow** grabs you by the shoulder. He has some unanswered questions.`)
        const char = getCharacter('Bearded Fellow')
        char.chatLog = []
        char.topics = char.topicsAfterBreakingIn
        char.onTalk = () => println(`"What were you doing in my hut, friend?", the **Bearded Fellow** inquires with a thin calmness.`)
        char.roomId = 'nextToHut'
        room.desc = `There's a fireplace at the center of the hut. A huge ***kettle*** hangs from the ceiling on top of it.
      There's a bed covered with goat furs and the floor is littered with curved drinking horns. There's a ***chest*** at the foot of the bed.`;
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
            name: 'kettle',
            desc: `It's an enormous kettle. It's full of ***porridge***. The kettle is hanging from the ceiling with a ***rope***.`,
            onSwing: () => println(`You come to your senses before the axe connects.`)
        },
        {
            name: 'rope',
            desc: `It's a white rope braided from goat fur.`,
            broken: false,
            onSwing: () => {
                const room = getRoom(`insideHut`)
                if (!room.items[1].broken) {
                    room.items[1].broken = true
                    println(`The rope snaps and the ***kettle*** falls to the ground. The ***porridge*** spills all over the floor.`)
                    room.items[0].desc = `The enormous kettle is fallen on its side. There's ***porridge*** spilled all over. The kettle is slowly spurting more ***porridge*** on the floor.`
                    room.items[1].desc = `It was a perfectly good rope...`
                    room.desc = `There's a fireplace at the center of the hut. A fallen ***kettle*** slowly spurts ***porridge*** on the floor.
            There's a bed covered with goat furs. Curved drinking horns have been tossed on the floor around it. There's a ***chest*** at the foot of the bed.`
                } else {
                    println(`It's already cut!`)
                }
            },
            onEat: () => println(`It tastes goaty.`)
        },
        {
            name: 'chest',
            desc: `It's a perfectly good wooden chest.`,
            onOpen: () => {
                println(`It's locked.`)
            },
            onSwing: () => {
                println(`The wooden ***chest*** splinters to small pieces. The metal framing of the chest gives in and reveals the innards of the ***chest***.`)
                getRoom('insideHut').items[2].desc = `There's a ***Golden Horn*** in the rubble of the broken chest.`;
                getRoom('insideHut').items[3].isTakeable = true;
            }
        },
        {
            name: 'Golden Horn',
            desc: `It's gleaming gold.
        There's a carving on the side:
        ᚴᛋᛅᛚᛚᛅᚱᚼᚬᚱᚾ`,
            isTakeable: false,
            onTake: () => {
                println(`You took the ***Golden Horn***.`)
                const bearded = getCharacter('Bearded Fellow')
                bearded.topicsAfterBreakingIn.push({
                    option: '***Found*** this horn.',
                    removeOnRead: true,
                    onSelected: () => {
                        const char = getCharacter('Bearded Fellow')
                        char.topics = char.topics.filter(t => (!t.option.includes('***Nothing***') && !t.option.includes('***Just***') && !t.option.includes('***Found***')))
                    },
                    line: `The **Bearded Fellow** stares at you silently for a moment.
            "My friend, if you can answer my question correctly, I shan't kill you", he says plainly.`,
                })
                const chieftain = getCharacter('chieftain')
                chieftain.topics.push({
                    option: `***Stole*** it from some hut.`,
                    removeOnRead: true,
                    prereqs: ['here'],
                    line: `"I see..." the **Chieftain** ponders for a moment.
              "This is the Golden Horn of the Bearded one", the **Chieftain** says darkly.
              "It it said that the sound of this horn brings war. The final war."`
                })
            },
            onUse: () => {
                println(`You blow the ***Golden Horn***.`);
                const room = getRoom('frostVillageGate')
                if (disk.roomId === 'frostVillageGate' && room.gateOpen === false) {
                    room.gateOpen = true
                    room.exits.forEach(exit => {
                        delete exit.block;
                    });
                    println(`A somber melody fills the air as the small **Giant** plays its ***Flute of Ice*** in response to your silent blow.
            The black rock ***gate*** opens to the side with a sound of heavy grinding.
            You can now enter the Frost Village to the ***east***.`);
                } else {
                    println(`No sound comes out.`);
                }
            },
            onSwing: () => {
                println(`It doesn't even leave a scratch.`)
            }
        },
        {
            name: 'porridge',
            desc: `It looks nutritious.`,
            onEat: () => {
                const room = getRoom('insideHut')
                room.items[0].desc = `It's an enormous kettle. It's still full of ***porridge***! The kettle is hanging from the ceiling with a ***rope***.`
                println(`The porridge is undescribably good.
          Your Henki is restored to full HP! (Henki Points)`)
                player.hp = 100;
            },
            onSwing: () => println(`You come to your senses before the axe connects.`)
        }
    ],
    exits: [
        { dir: 'north', id: 'nextToHut' },
    ],
}