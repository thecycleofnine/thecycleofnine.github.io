const spiritWorld4 = {
    id: 'spiritWorld4', // unique ID for this room
    name: 'Altered State of Mind', // room name (shown when player enters the room)                                                                          
    // room description (shown when player first enters the room)
    desc:  `A lot has happened in this space of time.
    Less happens in this time of space.`,
    onFeel: () => {
      if (getItemInInventory('Henki')) {
        println(`It's all mushy around you.
        Everything is alive and in constant transition.`)
      } else {
        println(`You are a disembodied conciousness.
        There are multiple presences floating around here.`)
      }
    },
    items: [
      {
        id: 'Henki',
        name: 'Henki',
        desc: `It is a formless spirit. A life force. It pihises.`,
        onSwing: () => {
          println(`The henki swirls and joins the axe. The henki is swinging the axe. The axe is swinging itself.
          Everything is swinging, swimming and singing.`)
        },
        onEat: () => println(`Why eat something that is already you?`)
      }
    ],
    exits: [
        {dir: 'north', id: 'spiritWorld5'},
        {dir: 'east', id: 'spiritWorld5'},
        {dir: 'south', id: 'spiritWorld5'},
        {dir: 'west', id: 'spiritWorld5'},
        {dir: 'east', id: 'spiritWorld5'},
        {dir: 'northeast', id: 'spiritWorld5'},
        {dir: 'southeast', id: 'spiritWorld5'},
        {dir: 'southwest', id: 'spiritWorld5'},
        {dir: 'northwest', id: 'spiritWorld5'},
    ],
  }