const rockyPlace = {
    id: 'rockyPlace',
    name: 'Rocky place',
    desc: `You crawl through the mushy darkness and emerge from what seems to be the trunk of a tree. You splash hard onto a rocky surface.
    It's a lot less mushy now.
    You find the strength to ***open*** your eyes.`,
    onEnter: () => {
      const room = getRoom('rockyPlace');
      room.desc = `You are on a mountain range. The cloudy sky is dark purple. There are **weeds** swaying in the light breeze beside you glowing violet.
      You can try to ***look at*** them.
      The **tree** from which you emerged is to the ***south***.`;
    },
    onFeel: () => {
      println(`It's rocky beneath your feet but you can still feel a fleeing sensation of mushiness.
      *You can sense available directions with **go**.*`)
    },
    items: [
      {
        name: 'weeds',
        desc: `The ***weeds*** are emitting a violet glow.
        They are fascinating.`,
        onEat: () => println(`You munch on the glowing violet **weeds**. They are now glowing inside you.`)
      },
      {
        name: 'tree',
        desc: `The ***tree*** is old as the Moon. There's a ***womb*** at the base of its trunk.`,
      },
      {
        name: 'womb',
        desc: `The womb is closed.
        It's connected to the base of the tree. You can hear new life pulsating inside.`,
        onEat: () => println(`omg`)
      },
      {
        name: 'moon',
        desc: `There is a single moon in the sky. It's Blue and mysterious.
        It's pretty old.`,
      },
    ],
    exits: [
      // exits with a BLOCK cannot be used, but print a message instead
      {dir: 'south', id: 'beginning', block: `You are not wanted.`},
      {dir: 'east', id: 'uphill'},
    ],
  }