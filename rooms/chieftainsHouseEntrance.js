const chieftainsHouseEntrance = {
    id: 'chieftainsHouseEntrance',
    name: `Entrance to Chieftain's House`,
    desc: `The Chieftain's **Housecarl** is standing guard at the entrance to the ***Chieftain's House***.`,
    items: [
        {
            name: 'longsword',
            desc: `It's a perfectly good longsword for chopping off heads. It's emitting a blue light. A magical weapon for certain.`,
            onSwing: () => {
                const room = getRoom('chieftainsHouseEntrance')
                println(`You hear a swish as your head drops from your shoulders.`)
                toValhalla(room.foes[0])
            },
            onEat: () => {
                const room = getRoom('chieftainsHouseEntrance')
                println(`You hear a swish as your head drops from your shoulders.`)
                toValhalla(room.foes[0])
            },
            onTake: () => {
                const room = getRoom('chieftainsHouseEntrance')
                println(`You hear a swish as your head drops from your shoulders.`)
                toValhalla(room.foes[0])
            }
        },
        {
            name: `Chieftain's House`,
            desc: `The mighty house is painted bright red. The roof is made from an old galley turned upside down. A huge bonfire has been lit on the roof, it has an eternal feeling to it.`
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
              const room = getRoom('chieftainsHouseEntrance')
              toValhalla(room.foes[0])
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
        { dir: 'east', id: 'chieftainsHouse', block: `The Chieftain's **Housecarl** doesn't let you pass.` }
    ]
}