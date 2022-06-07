const spiritWorld2 = {
    id: 'spiritWorld2', // unique ID for this room
    name: 'Altered State of Mind', // room name (shown when player enters the room)                                                                          
    // room description (shown when player first enters the room)
    desc:  `Movement is stationary. It all happens here.
    Colorful particles float in every direction.`,
    onFeel: () => {
      if (getItemInInventory('Henki')) {
        println(`It's all mushy around you.
        Everything is alive and in constant motion.`)
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
          println(`The henki swirls and joins the axe. The henki is swinging the axe.`)
        },
        onEat: () => println(`Why eat something that is already you?`)
      }
    ],
    exits: [
        {dir: 'north', id: 'spiritWorld3'},
        {dir: 'east', id: 'spiritWorld3'},
        {dir: 'south', id: 'spiritWorld3'},
        {dir: 'west', id: 'spiritWorld3'},
        {dir: 'east', id: 'spiritWorld3'},
        {dir: 'northeast', id: 'spiritWorld3'},
        {dir: 'southeast', id: 'spiritWorld3'},
        {dir: 'southwest', id: 'spiritWorld3'},
        {dir: 'northwest', id: 'spiritWorld3'},
    ],
  }