const fieldOfEyesAndEars = {
    id: 'fieldOfEyesAndEars',
    name: 'Field of eyes and ears',
    desc: `You are standing on a field where one could grow flowers. Instead there are hundreds of ***eyes*** and ***ears*** growing from the dry soil.
    A path to the ***south*** seems to lead down from the mountain range.
    There's a small hut to the ***northeast***.`,
    earsSplitted: false,
    onEnter: () => {
        const char = getCharacter('Bearded Fellow')
        char.topics = char.uphillTopicsAfterLeaving
        char.chatLog = char.chatLog.filter(t => t !== 'yes')
        char.onTalk = () => println(`"Hello, friend!", the **Bearded Fellow** booms.
        "Have you slain many giants?"`)
      },
    items: [
      {
        name: 'eyes',
        desc: `The eyes are very veiny. Not ripe yet. They do not yet see.`,
        onTake: () => {
          println(`They are not ripe yet.`)
        },
        onSwing: () => {
          println(`Some of the eyes explode with a small puff of blue mist. They sound like shattering thin glass spheres.`)
        },
        onEat: () => {
          println(`You start to cough as the eyes puff blue mist into your lungs.`)
        }
      },
      {
        name: 'ears',
        desc: `The ears have very little hair. Not ripe yet. They do not yet hear.`,
        onTake: () => {
          println(`They are not yet ripe.`)
        },
        onSwing: () => {
          println(`It's an earsplitting frenzy.`)
          if (!this.earsSplitted) {
            println(`A ***Mimir's Ear*** on the ground senses mortal danger. It ripens instantly.`)
            this.earsSplitted = true
            getRoom('fieldOfEyesAndEars').items.push({
              name: `Mimir's Ear`,
              desc: `It hears everything.`,
              isTakeable: true,
              onTake: () => {
                println(`You took the ***Mimir's Ear***.`)
                const room = getRoom('fieldOfEyesAndEars')
                room.items = room.items.filter(item => item.name !== `Mimir's Ear`)
              },
              onUse: () => {
                useMimirsEar()
              },
              onSwing: () => {
                println(`It's an earsplitting frenzy.`)
                demoDisk.inventory = disk.inventory.filter(item => item.name !== `Mimir's Ear`);
              },
              onEat: () => {
                println(`You munch on the ***Mimir's Ear***. It's hairy on the inside.`);
                demoDisk.inventory = disk.inventory.filter(item => item.name !== `Mimir's Ear`);
              }
            })
          }
        },
        onEat: () => {
          println(`You start to cough as the eyes puff blue mist into your lungs.`)
        }
      }
    ],
    exits: [
      { dir: 'west', id: 'uphill' },
      { dir: 'northeast', id: 'nextToHut' },
      { dir: 'south', id: 'hillside' }
    ],
  }