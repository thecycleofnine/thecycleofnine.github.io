const chieftainsHouse = {
    id: 'chieftainsHouse',
    name: `Chieftain's House`,
    desc: `The house is a long hall. Wooden tables stand decorated on each side filling the whole depth of the hall. There's a big fireplace at the center. Small Giant servants hustle around hurrily.
    The **Chieftain** sits comfortably on a throne covered with wolfskins.`,
    onEnter: () => {
        const entrance = getRoom('chieftainsHouseEntrance')
        entrance.foes = []
        const housecarl = getCharacter('housecarl')
        housecarl.roomId = 'chieftainsHouse'
    },
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
        { dir: 'west', id: 'frostVillage' }
    ]
}