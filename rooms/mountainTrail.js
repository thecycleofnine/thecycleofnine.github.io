const mountainTrail = {
    id: 'mountainTrail',
    name: 'Mountain trail',
    desc: `The snows of the serpentine trail squeak under your feet. The icy winds create small snow whirlwinds in the air.
    The ***top*** of the mountain in the ***east*** is clearly visible from here.
    A gust of wind reveals a frozen ***figure*** laying under a thin sheet of ice and snow.`,
    onEnter: () => {
      const char = getCharacter('Bearded Fellow')
      char.roomId = 'uphill'
      const room = getRoom('uphill')
      room.desc = `There's a ***Bearded Fellow*** sitting merrily on a wooden ***log***. He's drinking juniper mead. 
      To the ***east*** there's a steep path up a foul-looking mountain. The peak is covered in thick sheets of ice. Some kind of energy is rising from the top towards the purple sky.`
    },
    foes: [
      {
        name: ['Frost Giant', 'Giant', 'Figure', 'Frost'],
        hp: 100,
        alive: true,
        inCombat: false,
        isArmed: true,
        partiallyBlinded: false,
        onLook: () => {
          const giant = getRoom('mountainTrail').foes[0];
          if (giant.inCombat) {
            if (giant.hp >= 60) {
              println(`The **Frost Giant** is towering over you with the dangerous-looking ***Club of Ice*** ready in hand. The **Giant**'s blinkless blue gaze is highly disturbing.`)
            } else if (giant.hp < 60 && giant.hp > 20) {
              println(`The **Frost Giant** is slow and wounded. It's starting to blink slowly every once in a while.`)
            } else {
              println(`The **Frost Giant** is badly wounded. It's stumbling on the bloodstained snow with its gaze hollow and dim.`)
            }
          } else {
            println(`It's a Frost Giant about 2 meters tall laying still on its back. Skin pale as snow with a face like a pile of daggers. It's holding a ***Club of Ice*** with a firm grip. Its eyes are closed.`)
          }
        },
        onEngage: () => {
          const room = getRoom('mountainTrail')
          player.inCombat = true;
          room.foes[0].inCombat = true;
          getRoom('mountainTrail').exits[1].block = `The angry **Frost Giant** steps in front of you as you try to pass.`
          println(`The ice cracks open under the weight of the swing. The bloodied **Frost Giant** rises slowly from the ground. It fixes its deep blue ***eyes*** upon you.`)
          getRoom('mountainTrail').desc = `Icy winds create small snow whirlwinds in the air.
          The path to the ***top*** of the mountain is blocked by a huge **Frost Giant** about to smash you into pieces.`
        },
        hitDescriptions: [
          `Your axe cuts deep into the **Giant**'s shoulder.`,
          `The axe sinks into the **Frost Giant**'s chest.`,
          `You slice a chunck of ice off the **Giant**'s leg.`,
          `The axe cuts off a chip of ice from the **Giant**'s face.`,
          `You remove a sheet of ice from the **Giant**'s shoulder.`,
          `Blue lifeblood gushes out from the **Giant**'s side.`,
          `The blow is devastating. The **Giant** stumbles on its feet.`,
        ],
        missDescriptions: [
          `The **Giant** blocks your swing with the ***Club of Ice***.
          A shimmering sound fills the air as the weapons clang together.`,
          `The **Giant** leans back and evades your swing.`,
          `The **Giant** leans to the side to evade your swing.`
        ],
        attackDescriptions: [
          `The **Giant** crushes your shoulder with the ***Club of Ice***.`,
          `Blood fills your mouth as the ***Club of Ice*** connects with your teeth.`,
          `The **Giant** slams the ***Club of Ice*** into your ribcage.`,
          `A blow from the ***Club of Ice*** sends you flying into the ground.
          You brush off the snow and manage to get up.`
        ],
        onDeath: () => {
          player.slayedGiants += 1;
          player.inCombat = false;
          const room = getRoom('mountainTrail')
          println(`The **Frost Giant** drops to the ground lifeless.`)
          room.foes[0].onLook = () => println(`The dead **Frost Giant** is slowly decaying into snow and ice.`)
          room.desc = `Icy winds create small snow whirlwinds in the air. There's a **Frost Giant** laying dead on the snow. An ***Eye of Frost*** has dropped out of its decaying body. 
          The icy mountain peak is to the ***east***.`
          room.items = room.items.filter(item => item.name !== 'eyes')
          room.items.push({
            name: 'Frost Giant',
            desc: `The **Frost Giant** is laying dead on the snow. A formidable foe. There's an ***Eye of Frost*** beside it on the snow.`
          })
          room.items.push({
            name: `Eye of Frost`,
            desc: `It's a big sphere of blue ice. There seems to be thunder and lightning trapped inside.`,
            isTakeable: true,
            onUse: () => {
              println(`It's neither the time nor the place.`)
            },
            onEat: () => {
              println(`You eat the ***Eye of Frost***. It has a foul squishy taste.`)
              disk.inventory = disk.inventory.filter(item => item.name !== `Eye of Frost`)
            },
            onSwing: () => {
              println(`The ***Eye of Frost*** gets sliced into two halves and they melt away in seconds.`)
              disk.inventory = disk.inventory.filter(item => item.name !== `Eye of Frost`)
            },
            onTake: () => {
              println(`You took the ***Eye of Frost***.`)
              const room = getRoom('mountainTrail')
              room.desc = `Icy winds create small snow whirlwinds in the air. There's a **Frost Giant** laying dead on the snow.`
              room.items[room.items.length-1].desc = `The **Frost Giant** is laying dead on the snow. A formidable foe.`
            }
          })
        },
      }
    ],
    items: [
      {
        name: 'Club of Ice',
        desc: `The whole club is covered in crushed blue icicles. There's a sharp monotone sound coming from it. It seems to be a magical weapon.`,
        isTakeable: false,
        onTake: () => println(getRoom('mountainTrail').foes[0].alive ? `You try to grab on to the ***Club of Ice*** but the **Frost Giant** shakes you off easily.` : `It's way too heavy to lift.`),
        onSwing: () => {
          println(`The weapons repel each other with a loud crack followed by a magical shimmer.`)
        },
        onEat: () => {
          const room = getRoom('mountainTrail')
          if (room.foes[0].alive) {
            if (player.hp > 15) {
              player.hp -= 15
              println(`The ***Club of Ice*** breaks your teeth!`)
            } else {
              println(`The **Frost Giant** serves you a cold dish.`)
              toValhalla(room.foes[0])
            }
          }
        }
      },
      {
        name: 'top',
        desc: `There's a solemn gate-like arc standing tall on the icy mountain peak. It must be at least 4 meters high. It seems to be emitting some kind of energy towards the sky.`,
        onSwing: () => println(`What a concept!`)
      },
      {
        name: 'eyes',
        desc: `The **Giant**'s blue ***eyes*** are fierce and sharp as knives. They are filled with crackling blue thunder.`,
        onSwing: () => {
          const room = getRoom('mountainTrail')
          const giant = room.foes[0]
          if (giant.alive && !giant.partiallyBlinded) {
            println(`The axe cuts the ***eyes*** of the **Frost Giant** effortlessly.
            The **Frost Giant** is partially blinded.`)
            room.items[2].desc = `The **Giant**'s left eye is splitted diagonally. It's cloudy. The other one is filled with crackling blue thunder.`
            giant.partiallyBlinded = true
            if (giant.hp > 20) {
              giant.hp -= 20
            } else {
              giant.onDeath()
            }
          } else if (giant.alive) {
            println(`The **Frost Giant** anticipates your move and evades your swing with ease.
            The ***Club of Ice*** sweeps to your jaw from below.`)
            if (player.hp > 35) {
              player.hp -= 35
            } else {
              toValhalla(giant)
            }
          }
        }
      }
    ],
    exits: [
      { dir: 'west', id: 'nextToHut' },
      { dir: 'east', id: 'mountainRidge' },
    ],
  }