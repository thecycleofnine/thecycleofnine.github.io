const chieftainsHallEntrance = {
    id: 'chieftainsHallEntrance',
    area: 'Frost village',
    name: `Entrance to Chieftain's House`,
    desc: `The Chieftain's **Housecarl** is standing guard at the entrance to the ***Chieftain's Hall***.`,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`TBAopen`)
        } else {
            println(`TBAclosed`)
        }
    },
    items: [
        {
            name: 'longsword',
            desc: `It's a perfectly good longsword for chopping off heads. It's emitting a blue light. Certainly a magical weapon.`,
            onSwing: () => {
                const room = getRoom('chieftainsHallEntrance')
                println(`You hear a swish as your head drops from your shoulders.`)
                toValhall(room.foes[0])
            },
            onEat: () => {
                const room = getRoom('chieftainsHallEntrance')
                println(`You hear a swish as your head drops from your shoulders.`)
                toValhall(room.foes[0])
            },
            onTake: () => {
                const room = getRoom('chieftainsHallEntrance')
                println(`You hear a swish as your head drops from your shoulders.`)
                toValhall(room.foes[0])
            }
        },
        {
            name: `Chieftain's House`,
            desc: `The mighty house is painted bright red. The roof is made from an old galley turned upside down. A huge bonfire has been lit on the roof. It has an eternal feeling to it.`
        }
    ],
    foes: [
        {
          name: ['Housecarl', 'The Housecarl'],
          hp: 200,
          alive: true,
          inCombat: false,
          isArmed: true,
          onEngage: () => {
              const room = getRoom('chieftainsHallEntrance')
              toValhall(room.foes[0])
          },
          hitDescriptions: [
            ``,
          ],
          missDescriptions: [
            ``,
          ],
          attackDescriptions: [
            ``,
          ],
        }
    ],
    exits: [
        { dir: 'west', id: 'frostVillage' },
        { dir: 'east', id: 'chieftainsHall', block: `The Chieftain's **Housecarl** doesn't let you pass.` }
    ]
}