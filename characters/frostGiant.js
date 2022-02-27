// At the gate
const frostGiant = {
    name: ['Frost Giant', 'Giant', 'Small Frost Giant', 'Frost'],
    roomId: 'frostVillageGate',
    desc: `The small **Frost Giant** is sitting on top of the wall its legs swinging playfully in the air. It's playing a somber melody with the ***Flute of Ice***.`,
    onSwing: () => println(`It's way too high!`),
    onTalk: () => println(`The small **Frost Giant** stares at you with a pair of unblinking blue eyes from the top of the wall.`),
    topics: [
      {
        option: '***Can*** you open the gate?',
        removeOnRead: true,
        onSelected: () => println(`The small **Frost Giant** shakes its head.`)
      },
      {
        option: '***Please*** open the gate?',
        prereqs: ['can'],
        removeOnRead: true,
        onSelected: () => println(`The small **Frost Giant** stops to think for a moment and then shakes its head.`)
      },
      {
        option: '***What*** will it take to get this gate open?',
        removeOnRead: true,
        prereqs: ['please'],
        onSelected: () => {
          println(`The small **Frost Giant** makes a ***carving*** into a sheet of ice and tosses it to you.`)
          disk.inventory.push({
            name: 'Carving',
            desc: `It's a carving on a sheet of ice. It depicts a horn of some kind.`,
            onEat: () => {
              disk.inventory = disk.inventory.filter(item => item.name !== 'Carving')
              println(`It melts into your mouth but there is no particular taste to it.`)
            },
            onSwing: () => {
              disk.inventory = disk.inventory.filter(item => item.name !== 'Carving')
              println(`It breaks easily into pieces.`)
            }
          })
        }
      },
      {
        option: `***Do*** you understand what I'm saying?`,
        onSelected: () => println(`The small **Frost Giant** stares at you for a moment and then nods three times.`),
        removeOnRead: true,
      }
    ]
  }

  // On top of the wall
const smallFrostGiant = {
  name: ['Frost Giant', 'Giant', 'Small Frost Giant', 'Frost'],
    roomId: 'frostVillageWall',
    desc: `The small **Frost Giant** is sitting at the edge of the wall its legs swinging playfully in the air. It's playing a somber melody with the ***Flute of Ice***.`,
    onSwing: () => println(`The **Frost Giant** leaps out of the way in panic.`),
    onTalk: () => println(`The small **Frost Giant** stares at you with a pair of unblinking blue eyes.`),
    topics: [
      {
        option: `***What*** is this horn?`,
        removeOnRead: true,
        onSelected: () => println(`The small **Frost Giant** simply points at the Chieftain's house.`)
      },
      {
        option: '***Where*** are we?',
        removeOnRead: true,
        onSelected: () => println(`The small **Frost Giant** gives you a bizarre look.`)
      },
      {
        option: `***Tell*** me about the chieftain.`,
        removeOnRead: true,
        prereqs: ['what'],
        onSelected: () => println(`The **Frost Giant** looks at you frustrated and points at the chieftain's house again.`)
      }
    ]
}