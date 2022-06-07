const fisherVillageAltar = {
    id: 'fisherVillageAltar',
    name: 'Fisher village altar',
    desc:  `You are standing before a wooden ***statue*** three times your height. It's carved from a thick ash tree.`,
    onFeel: () => {
      println(`You feel an immensely overwhelming presence. It feels almost menacing.`)
    },
    items: [
      {
        id: 'statue',
        name: 'Wooden statue',
        desc: `The thick wooden statue represents a one-eyed god.`,
        onSwing: () => {
          println(`It leaves a big dent into the ash wood.`)
        },
      }
    ],
    exits: [
      {dir: 'north', id: 'fisherVillageSquare'},
    ],
  }