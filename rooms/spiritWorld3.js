const spiritWorld3 = {
    id: 'spiritWorld3', // unique ID for this room
    name: 'Altered State of Mind', // room name (shown when player enters the room)                                                                          
    // room description (shown when player first enters the room)
    desc:  `The Three spin the threads of this cosmos.
    Happened is going to be happening shall happen.
    Content of time.`,
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
        {dir: 'north', id: 'spiritWorld4'},
        {dir: 'east', id: 'spiritWorld4'},
        {dir: 'south', id: 'spiritWorld4'},
        {dir: 'west', id: 'spiritWorld4'},
        {dir: 'east', id: 'spiritWorld4'},
        {dir: 'northeast', id: 'spiritWorld4'},
        {dir: 'southeast', id: 'spiritWorld4'},
        {dir: 'southwest', id: 'spiritWorld4'},
        {dir: 'northwest', id: 'spiritWorld4'},
    ],
  }