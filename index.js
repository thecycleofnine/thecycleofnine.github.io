// global properties, assigned with let for easy overriding by the user
let disk;

// store user input history
let inputs;
let inputsPos;
let roomHistory;

// define list style
let bullet = '•';

// reference to the input element
let input = document.querySelector('#input');

// define player
let player;

// add any default values to the disk
// disk -> disk
let init = (disk) => {
  const initializedDisk = Object.assign({}, disk);
  initializedDisk.rooms = disk.rooms.map((room) => {
    // number of times a room has been visited
    room.visits = 0;
    return room;
  });
  
  player = disk.player;
  inputs = disk.inputs;
  inputsPos = disk.inputsPos;
  roomHistory = disk.roomHistory;

  if (!initializedDisk.inventory) { 
    initializedDisk.inventory = [];

    // REMOVE THIS
    //initializedDisk.inventory.push({
    //  name: 'Fine Axe',
    //  desc: `The axe is made of the frozen tears of a giant.
    //  Tou use it you can ***swing at*** things.`,
    //  onUse: () => {
    //    println(`You swing the ***Fine Axe*** aimlessly.
    //    The nearby spirits are terrified.`)
    //  },
    //  onSwing: () => println('What a concept!')
    //});
    initializedDisk.inventory.push({
      id: 'Henki',
      name: 'Henki',
      desc: `It is a formless spirit. A life force. It pihises.`,
      isTakeable: true,
      onTake: () => {
        const room = getRoom('beginning');
        delete room.exits[0].block;
        if (!disk.helpCommands.includes('inv')) disk.helpCommands.push('inv');
        println(`It is a spirit called **Henki**.
        It circles around you, measuring you.
        Slowly, you become intertwined with it
        till death do you part.
        *Type **inv** to see your inventory.*
        *Type **help** to see available commands.*`);
      },
      onUse: () => {
        println(`Your spirit ***Henki*** pihises at ${player.hp} Henki Points (HP).`)
      },
      onSwing: () => {
        initializedDisk.inventory = initializedDisk.inventory.filter(item => item.name !== 'Henki')
        toHel(`It's all foggy and cold.
        You feel empty inside.
        You realise you have been dead for a while now.`)
      },
      onEat: () => println(`What a concept!`)
    });
    initializedDisk.inventory.push({
      id: 'Muisti',
      name: 'Muisti',
      desc: `It is a feeble spirit. It holds no memories at the moment.`,
      onUse: () => {
        if (!localStorage.getItem('Muisti')) {
          println(`Your ***Muisti*** spirit commits this spacetime to memory. Use ***Muisti*** again to return here at any time.`)
          const memory = getItemInInventory('Muisti')
          memory.desc = `It is a feeble spirit. It's holding one memory with great effort.`
          initializedDisk.inventory = initializedDisk.inventory.filter(i => i.id !== 'Muisti')
          initializedDisk.inventory.push(memory)
          save('Muisti')
        } else {
          println(`Your ***Muisti*** spirit recalls a memory with great effort. ***Muisti*** is too weak a spirit to hold on to any additional memories.`)
          load('Muisti')
        }
      },
      onSwing: () => println(`Nothing happened. You can't get rid of your problems that easily.`),
      onEat: () => println(`What a concept!`)
    });
    initializedDisk.inventory.push({
      id: 'Ajatus',
      name: 'Ajatus',
      desc: `It is your thought spirit. It feeds you with things to think about.`,
      onUse: () => {
        think()
      },
      onSwing: () => println(`Nothing happened. You can't get rid of your thoughts that easily.`),
      onEat: () => println(`***Ajatus*** is very pleased to feed.`)
    });
  }

  if (!initializedDisk.characters) {
    initializedDisk.characters = [];
  }

  initializedDisk.characters = initializedDisk.characters.map(char => {
    // player's conversation history with this character
    char.chatLog = [];
    return char;
  });

  return initializedDisk;
};

// register listeners for input events
let setup = () => {
  input.addEventListener('keypress', (e) => {
    const ENTER = 13;

    if (e.keyCode === ENTER) {
      applyInput();
    }
  });

  input.addEventListener('keydown', (e) => {
    input.focus();

    const UP = 38;
    const DOWN = 40;
    const TAB = 9;

    if (e.keyCode === UP) {
      navigateHistory('prev');
    } else if (e.keyCode === DOWN) {
      navigateHistory('next');
    } else if (e.keyCode === TAB) {
      e.stopPropagation();
      e.preventDefault()
      autocomplete();
    }
  });

  input.addEventListener('focusout', () => {
    input.focus({preventScroll: true});
  });
};


const selectStylesheet = filename => {
  document.getElementById('styles').setAttribute('href', filename);
  setTimeout(() => {
    window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
  }, 100)
}


// convert the disk to JSON and store it
// (optionally accepts a name for the save)
let save = (name) => {
  const save = JSON.stringify(disk, (key, value) => typeof value === 'function' ? value.toString() : value);
  localStorage.setItem(name, save);
};

// restore the disk from storage
// (optionally accepts a name for the save)
let load = (name) => {
  const save = localStorage.getItem(name);
  
  if (!save) {
    println(`Save file not found.`);
    return;
  }
  
  disk = JSON.parse(save, (key, value) => {
    try {
      const evaled = eval(value);
      if ((key === 'id' || key === 'roomId') && typeof(evaled) === 'object' && evaled.id) {
        return evaled.id;
      } else {
        return evaled;
      }
    } catch (error) {
      return value;
    }
  });
  player = disk.player;
  inputs = disk.inputs;
  inputsPos = disk.inputsPos;
  roomHistory = disk.roomHistory;

  enterRoom(disk.roomId);
};

// list player inventory
let inv = () => {
  const items = disk.inventory.filter(item => !item.isHidden);

  if (!items.length) {
    println(`You don't have any items in your inventory.`);
    return;
  }

  println(`You have the following items in your inventory:`);
  items.forEach(item => {
    println(`${bullet} ${getName(item.name)}`);
  });

  const room = getRoom(disk.roomId);
  if (room.id === 'beginning') {
    if (!disk.helpCommands.includes('go')) disk.helpCommands.push('go')
    if (!disk.helpCommands.includes(`go [direction]`)) disk.helpCommands.push(`go [direction]`)
    println(`Suddenly, there's a beam of light coming from the ***north***. It calls you to ***go***.
    ***You can press Tab after a couple of characters to autocomplete commands.***`);
  }
};

// show room description
let look = () => {
  const room = getRoom(disk.roomId);

  if (!player.eyesAreOpen) {
    println(`It's mesmerising but unfortunately your eyes are closed.`);
    return;
  }

  if (typeof room.onLook === 'function') {
    room.onLook({disk, println});
  }

  println(room.desc)
};

// open something
let open = (x) => {
  if (x.length === 0) {
    println(`Perhaps you wanted to ***open*** something in particular?`)
    return;
  }
  const room = getRoom(disk.roomId);
  const henki = getItemInInventory('Henki')
  if (room.id === 'beginning' && !henki) {
    println(`You try to open your eyes.
    But there is no one to experience it.
    Try to ***feel*** instead.`)
    return
  }
  if (x === 'eyes' && player.eyesAreOpen) {
    println(`Your eyes are already open!`);
    return
  } else if (x === 'eyes' && !player.eyesAreOpen) {
    player.eyesAreOpen = true;
    selectStylesheet(`styles/${room.id}.css`);
    println(`You open your eyes.
    You can ***look*** around now.`);
    return
  }
  const itemToOpen = getItemInRoom(x, room.id)
  if (!itemToOpen) {
    println(`There is no such thing here.`)
    return
  }
  if (itemToOpen && typeof(itemToOpen.onOpen) === 'function') {
    itemToOpen.onOpen()
  } else {
    println(`You can't open that.`)
  }
}

// open something
let close = (x) => {
  if (x.length === 0) {
    println(`Perhaps you wanted to ***close*** something in particular?`)
    return;
  }
  if (x === 'eyes' && !player.eyesAreOpen) {
    println(`Your eyes are already closed!`);
    return
  } else if (x === 'eyes' && player.eyesAreOpen) {
    player.eyesAreOpen = false;
    selectStylesheet(`styles/eyesClosed.css`);
    println(`You close your eyes.
    You can ***feel*** better.`);
    return
  }
  const itemToOpen = getItemInRoom(x, room.id)
  if (!itemToOpen) {
    println(`There is no such thing here.`)
    return
  }
  if (itemToOpen && typeof(itemToOpen.onOpen) === 'function') {
    itemToOpen.onOpen()
  } else {
    println(`You can't open that.`)
  }
}

let useHelsBlessing = () => {
  player.hp = 100
  const room = getRoom(disk.roomId)
  if (room.id === 'hel') {
    const char = getCharacter('Hel')
    char.chatLog = []
    char.topics = char.topicsAfterLeavingHel
    char.onTalk = () => println(`"Back so soon?" **Hel** smirks.
    "Will you be staying with us this time, oh special one?" she asks sarcastically.`)
    println(`***You emerge from an ash tree with a splash.***
    A ***Henki*** spirit joins you.`)
    disk.inventory.push({
      name: 'Henki',
      desc: `It is a formless spirit. A life force. It pihises.`,
      onUse: () => println(`Your spirit ***Henki*** pihises at ${player.hp} Henki Points (HP).`),
      onSwing: () => {
        toHel(`You have a faint memory of doing something incredibly stupid.
        You realise you are quite dead.`)
      },
      onEat: () => println(`What a concept!`)
    })
    let room = Math.floor(Math.random() * 4)
    if (room === 0) {
      enterRoom('pathToHodrsForest')
    }
    if (room === 1) {
      const rocky = getRoom('rockyPlace')
      rocky.desc = `You crawl through the mushy darkness and emerge from what seems to be the trunk of a tree. You splash hard onto a rocky surface. Again.`
      enterRoom('rockyPlace')
    }
    if (room === 2) {
      enterRoom('hodrsForest3')
    }
    if (room === 3) {
      enterRoom('fieldOfEyesAndEars')
    }
    if (room === 4) {
      enterRoom('frostLands')
    }
  } else {
    println(`Nothing happened.`)
  }
}

let mistletoe = () => {
  const room = getRoom(disk.roomId);
  if (room.id === 'nextToHut') {
    println(`The **Bearded Fellow** smiles ruefully. "Your knowledge is worthy of the horn, my friend."
    "It's all very sad, again." he says confusingly and enters the hut absorbed in thought.`)
    room.exits.forEach(exit => delete exit.block)
    room.exits[1].block = `The **Bearded Fellow** doesn't want to be disturbed right now.`
    const char = getCharacter('Bearded Fellow')
    char.roomId = 'insideHut'
    room.desc = `There's a small hut made of clay with a straw roof. Its ***entrance*** is to the ***south***.
    To the ***east*** there's a steep path up a foul-looking mountain. The peak is covered in thick sheets of ice. Some kind of energy is rising from the top towards the purple sky.`
  } else {
    println(pickQuote())
  }
}

// feel sensations
let feel = () => {
  const room = getRoom(disk.roomId);

  if (player.inCombat) {
    println(`Adrenaline is rushing wildly!`)
    if (player.hp > 90) {
      println(`Your body feels energetic!`)
    } else if (player.hp < 60 && player.hp > 20) {
      println(`Your body feels wounded. It needs healing.`)
    } else {
      println(`Your body feels heavy. It feels like you're barely able to move.`)
    }
    return;
  }
  if (typeof(room.onFeel) === 'function') {
    room.onFeel({println, getItemInInventory})
  } else {
    println(`Your feelings fail you.`)
  }
}

let drink = (name) => {
  if (name.length === 0) {
    println(`Perhaps you wanted to ***drink*** something in particular?`)
    return
  }
  const itemInRoom = getItemInRoom(name, disk.roomId);
  const itemInInventory = getItemInInventory(name)
  let item;
  if (itemInRoom) {
    item = itemInRoom
  }
  if (itemInInventory) {
    item = itemInInventory
  }
  
  if (typeof(item.onDrink) === 'function') {
    item.onDrink({println})
  } else {
    println(`You can't drink that.`);
  }
}

// eat things
let eat = (name) => {
  if (name.length === 0) {
    println(`Perhaps you wanted to ***eat*** something in particular?`)
    return
  }
  const itemInRoom = getItemInRoom(name, disk.roomId);
  const itemInInventory = getItemInInventory(name)
  if (!itemInRoom && !itemInInventory) {
    let charName;
    if (typeof(name) === 'object') {
      charName = name[0]
    } else if (typeof(name) === 'string') {
      charName = name
    }
    const character = getCharacter(charName);
    if (character) {
      if (['Hel'].includes(character.name[0])) {
        println(`**${character.name[0]}** is very confused by your attempt and pushes you away appalled.`)
        return
      }
      println(`The **${character.name[0]}** is very confused by your attempt and pushes you away appalled.`)
      return;
    }
    println(`There is no such thing here.`);
    return;
  }

  let item;
  if (itemInRoom) {
    item = itemInRoom
  }
  if (itemInInventory) {
    item = itemInInventory
  }
  
  if (typeof(item.onEat) === 'function') {
    item.onEat({println})
  } else {
    println(`You can't eat that.`);
  }
}

let quests = () => {
  println(`Quests:`)
  player.quests.forEach(q => {
    if (q.completed) {
      println(`${q.name} (Completed)`)
    } else if (q.failed) {
      println(`${q.name} (Failed)`)
    } else {
      println(q.name)
    }
  })
}

let thingsToHear = [
  `fur growing on a goat`,
  `blades of grass growing from the soil`,
  `clouds forming`,
  `a footstep of a cat`,
  `the movement of the mountain ranges`,
  `how the planet spins`,
  `a photon colliding with another`,
  `a conversation between two ants`,
  `the sound of a snail crawling`,
  `the clacking of a keyboard`,
  `the sound of one hand clapping`,
  `the sound of two hands clapping`,
  `the sound of three hands clapping`,
  `the sound of no hands clapping`,
  `a bird dropping a feather`,
  `the sound of a leaf dropping from a tree`,
  `the movement of the tectonic plates`,
  `a bacteria losing its balance`,
  `dust forming inside the ***hut***`,
  `the sound of yeast making alchohol from sugar`,
  `the growth of mushrooms`,
  `the crest of a gravitational wave`,
  `the spin of electrons`,
  `the shadow of a tree moving`,
  `a somber melody of a ***flute***`,
  `a curved horn being filled with mead`,
  `the flame on a red rooftop`,
  `a frozen tear forming`,
  `a ripple on the surface of the ***well***`,
  `seventeen eyes moving in their sockets`,
  `the cries of spirits`,
  `the joy of spirits`,
  `a conversation between two bream`,
  `a snake shedding its skin`,
  `hair growing inside itself`,
]

useMimirsEar = () => {
  if (thingsToHear.length === 0) {
    println(`The ***Mimir's Ear*** hears Everything.`)
    println(`A spirit **Itse** has been observing you for a while.
    It decides to join you.`)
    disk.inventory.push({
      name: 'Itse (The Listener)',
      desc: `It's who you are now.
      Or have been.
      It's a part of you.`,
      onUse: () => println(`Listen carefully:`),
      onSwing: () => println('What a concept!'),
      onEat: () => println('What a concept!'),
    })
  } else {
    const index = Math.floor(Math.random() * thingsToHear.length)
    println(`The ***Mimir's Ear*** hears ${thingsToHear[index]}.`)
    thingsToHear = thingsToHear.filter(thing => thing !== thingsToHear[index])
  }
}

let randomThoughts = [
  `I wonder what my face looks like`,
  `My spirits are what I am`,
  `Why would I even continue?`,
  `I must find purpose in this world`,
  `I have a really bad memory`,
  `Is it called death if I lose my ***Henki*** spirit?`,
  `What happens if I lose my ***Ajatus*** spirit?`,
  `What happens if I lose my ***Muisti*** spirit?`,
  `What happens if I lose all my spirits?`,
  `I wonder if there are more spirits to find`,
  `How many spirits does it take to be whole?`,
  `I should probably take some time to ***feel*** every now and then`,
  `Swinging at things with axes is such joy`,
  `I should probably find food at some point`,
  `I wonder how my ***Henki*** is doing`,
  `Why must I have such a weak ***Muisti*** spirit`,
  `If I'm not careful with my ***Muisti*** spirit I might lose a lot of progress`,
  `I wonder if there's afterlife? Could this be an afterlife already?`,
  `I wonder who all these characters are in this world`,
  `My ***Muisti*** spirit is so bad I have no clue where I am`,
  `I wonder how big this world is`,
  `Being lost is not so bad. Having no purpose – that's bad.`,
  `I wonder if I'd live forever just by stopping here`,
  `It's so relaxing to ***close*** my eyes for a moment`,
  `I wonder what things I could eat here`,
  `There must be some way to erase my memory`,
  `What were my ***quests*** again?`
]

let combatThoughts = [
  `My ***Henki*** spirit pihises, which means I must still be alive`,
  `I could probably smash the weapon`,
  `Trust your instincts`,
  `There are worse outcomes than death`,
  `Death can't be so bad after all`,
  `I wonder what happens if I die like this`,
  `Is this a formidable foe?`,
  `Would it be shameful to escape?`,
  `What a cruel world this is`,
  `I wonder if there are other methods to defeat this foe`,
  `Oh shit`,
  `I wonder if there's more I could do in this situation`,
  `Would it be shameful to die here?`,
  `What would I gain by defeating this foe?`,
  `Any mistake could lead to an early death`,
]

think = () => {
  if (player.inCombat) {
    const index = Math.floor(Math.random() * combatThoughts.length)
    println(`Your ***Ajatus*** spirit feeds you a thought:
    "${combatThoughts[index]}".`)
  } else {
    const index = Math.floor(Math.random() * randomThoughts.length)
    println(`Your ***Ajatus*** spirit feeds you a thought:
    "${randomThoughts[index]}".`)
  }
}

toValhalla = (foe) => {
  disk.inventory = disk.inventory.filter(i => i.name !== 'Henki')
  enterRoom('valhalla')
  player.henki = false;
  println(`A faint memory of a **${foe.name[0]}** lingers in your mind. 
  It all seemed so important at the time...
  You realise you are quite dead.`)
}

toHel = (desc) => {
  const room = getRoom('hel')
  disk.inventory = disk.inventory.filter(i => i.name !== 'Henki')
  room.printDescriptions = false
  enterRoom('hel')
  player.henki = false;
  println(desc)
}

hitOrMiss = (foe) => {
  if (!foe.alive) {
    println(`You are defiling the **${foe.name[0]}**'s corpse!`)
    return;
  }
  let prob = foe.inCombat ? Math.floor(Math.random() * 100) : 100
  if (player.friggsBlessing) prob += 20
  if (prob > 40) {
    // hit
    const damage = Math.floor(Math.random() * 10) + 35
    if (foe.inCombat) {
      const descIndex = Math.floor(Math.random() * foe.hitDescriptions.length)
      println(foe.hitDescriptions[descIndex])
      foe.hitDescriptions = foe.hitDescriptions.filter(d => d !== foe.hitDescriptions[descIndex])
      if (foe.hp > damage) {
        println(`The **${foe.name[0]}** is staggered.`)
      }
    }
    if (damage > 44) println(`Critical hit on the **${foe.name[0]}**!`)
    if (foe.hp > damage) {
      foe.hp -= damage
    } else {
      foe.hp = 0
      foe.alive = false
      if (typeof(foe.onDeath) === 'function') {
        foe.onDeath({println})
      }
    }
  } else {
    // miss
    let descIndex = Math.floor(Math.random() * foe.missDescriptions.length)
    println(foe.missDescriptions[descIndex])
    if (foe.isArmed) {
      descIndex = Math.floor(Math.random() * foe.attackDescriptions.length)
      println(foe.attackDescriptions[descIndex])
      foe.attackDescriptions = foe.attackDescriptions.filter(d => d != foe.attackDescriptions[descIndex])
      const damage = Math.floor(Math.random() * 10) + 40
      if (player.hp > damage) {
        player.hp -= damage;
      } else {
        player.hp = 0
        toValhalla(foe)
      }
    }
  }
}

let swingAt = (args) => {
  const axe = disk.inventory.filter(item => item.name === 'Fine Axe');
  if (axe.length === 0) {
    println(`You have nothing to swing.`);
    return;
  }
  if (args.length === 0 || args === 'at') {
    println(`Perhaps you wanted to ***swing at*** something in particular?`);
    return;
  }

  const [_, name] = args;
  const foe = getFoeInRoom(name, disk.roomId);
  const itemInRoom = getItemInRoom(name, disk.roomId);
  const itemInInventory = getItemInInventory(name)
  let characterName;
  let character;
  getCharactersInRoom(disk.roomId).filter(char => {
    char.name.forEach(charName => {
      if (charName.toLowerCase() === name) {
        characterName = char.name[0];
        character = char;
        return;
      }
    })
  });

  if (!foe && !itemInRoom && !itemInInventory && !character) {
    println(`There is no such thing here.`);
  } else {
    if (foe) {

      // swing at foe
      println(`You take a swing at the **${foe.name[0]}** with ***Fine Axe***.`)
      if (!foe.isArmed) {
        foe.onDeath();
        return;
      }
      if (foe.inCombat) {
        hitOrMiss(foe)
      } else {
          if (typeof(foe.onEngage) === 'function') {
            foe.onEngage({println})
          }
      }

    } else if (itemInInventory) {

      // swing at item
      if (typeof(itemInInventory.onSwing) === 'function') {
        println(`You take a swing at the ***${itemInInventory.name}*** with ***Fine Axe***.`)
        itemInInventory.onSwing({println, getCharacter})
      } else {
        println(`You can't swing at that!`)
      }

    } else if (itemInRoom) {

      // swing at item
      if (typeof(itemInRoom.onSwing) === 'function') {
        println(`You take a swing at the ***${itemInRoom.name}*** with ***Fine Axe***.`)
        itemInRoom.onSwing({println, getCharacter})
      } else {
        println(`You can't swing at that!`)
      }

    } else if (character) {

      // swing at character
      println(`You take a swing at the **${characterName}** with ***Fine Axe***.`)
      if (typeof(character.onSwing) === 'function') character.onSwing({println})

    }
  }
}

// look in the passed way
// string -> nothing
let lookThusly = (str) => {

  if (!player.eyesAreOpen) {
    println(`Your eyes are closed.
    Or maybe it's just too dark to see.
    It's hard to know, could be either.`);
    return;
  }

  if (str === 'around') {
    look()
  } else if (str === 'at') {
    println(`Perhaps you were trying to ***look at*** something in particular?`)
  } else if (['up', 'down', 'sideways', 'to the side', 'to side', 'behind'].includes(str.toLowerCase())) {
    println(`Your neck hurts.`);
  } else if (['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'nortwest'].includes(str.toLowerCase())) {
    println(`Maybe ***look at*** some item instead?`)
  } else if (str.length === 1) {
    println(`What a concept!`)
  } else {
    println(`Perhaps you were trying to ***look at*** the ${str}?`);
  }
}

// look at the passed item or character
// array -> nothing
let lookAt = (args) => {
  const [_, name] = args;
  const item = getItemInInventory(name) || getItemInRoom(name, disk.roomId);
  const character = getCharacter(name, getCharactersInRoom(disk.roomId));
  const foe = getFoeInRoom(name, disk.roomId)

  if (!player.eyesAreOpen) {
    println(`Your eyes are closed.`);
    return;
  }

  if (name === 'myself') {
    println(`You don't have a mirror but for what it's worth, I think you look lovely.`);
    return;
  }

  if (['them', 'it', 'that', 'those'].includes(name.toLowerCase())) {
    println(`You can only ***look at*** something in particular.`);
    return;
  }

  if (['ground', 'the ground', 'sky', 'the sky', 'mountain', 'mountains', 'the mountain', 'clouds', 'the clouds', 'cloud'].includes(name.toLowerCase())) {
    println(`You don't notice anything remarkable.`);
    return;
  }

  if (item) {
    // Look at an item.
    if (item.desc) {
      println(item.desc);
    } else {
      println(`You don\'t notice anything remarkable about it.`);
    }

    if (typeof(item.onLook) === 'function') {
      item.onLook({disk, println, getRoom, enterRoom, item});
    }

  } else if (character) {

      // Look at a character.
      if (character.desc) {
        println(character.desc);
      } else {
        println(`You don't notice anything remarkable about them.`);
      }

      if (typeof(character.onLook) === 'function') {
        character.onLook({disk, println, getRoom, enterRoom, character});
      }

  } else if (foe) {

    // look at foe
    if (typeof(foe.onLook) === 'function') {
      foe.onLook({disk, println, getRoom, enterRoom, foe})
    }

  } else {
    println(`There is no such thing here.`);
  }
};

// list available exits
let go = () => {
  const room = getRoom(disk.roomId);
  const exits = room.exits.filter(exit => !exit.isHidden);

  if (room.id.includes('hodrsForest')) {
    println(`You have lost your sense of direction.`)
    return
  }

  if (!exits) {
    println(`There's nowhere to go.`);
    return;
  }

  println(`Available directions are:`);
  exits.forEach((exit) => {
    const rm = getRoom(exit.id);

    if (!rm) {
      return;
    }

    const dir = getName(exit.dir);
    // include room name if player has been there before
    const directionName = rm.visits > 0
      ? `${dir} - ${rm.name}`
      : dir

    println(`${bullet} ${directionName}`);
  });
};

// find the exit with the passed direction in the given list
// string, array -> exit
let getExit = (dir, exits) => exits.find(exit =>
  Array.isArray(exit.dir)
    ? exit.dir.includes(dir)
    : exit.dir === dir
);

// go the passed direction
// string -> nothing
let goDir = (dir) => {
  const room = getRoom(disk.roomId);
  const exits = room.exits;

  if (dir === 'to') {
    println(`You can only ***go*** to some direction.
    For example ***go northeast***.`);
    return;
  }

  if (!exits) {
    println(`There's nowhere to go.`);
    return;
  }

  const nextRoom = getExit(dir, exits);

  if (!nextRoom) {
    println(`There is nothing in that direction.
    ***go*** is the magic spell for seeing all available directions.`);
    return;
  }

  if (nextRoom.block) {
    println(nextRoom.block);
    return;
  }

  enterRoom(nextRoom.id);
};

// shortcuts for cardinal directions
let n = () => goDir('north');
let s = () => goDir('south');
let e = () => goDir('east');
let w = () => goDir('west');
let ne = () => goDir('northeast');
let se = () => goDir('southeast');
let nw = () => goDir('northwest');
let sw = () => goDir('southwest');

// if there is one character in the room, engage that character in conversation
// otherwise, list characters in the room
let talk = () => {
  const characters = getCharactersInRoom(disk.roomId);

  // assume players wants to talk to the only character in the room
  if (characters.length === 1) {
    talkToOrAboutX('to', getName(characters[0].name));
    return;
  }

  // list characters in the room
  println(`You can ***talk to*** someone.`);
  chars();
};

// speak to someone or about some topic
// string, string -> nothing
let talkToOrAboutX = (preposition, x) => {
  const room = getRoom(disk.roomId);

  if (preposition !== 'to' && preposition !== 'about') {
    println(`You can ***talk to*** someone in particular.`);
    return;
  }

  const character =
    preposition === 'to' && getCharacter(x, getCharactersInRoom(room.id))
      ? getCharacter(x, getCharactersInRoom(room.id))
      : disk.conversant;
  let topics;
  
  // give the player a list of topics to choose from for the character
  const listTopics = () => {
    // capture reference to the current conversation
    disk.conversation = topics;
    
    if (topics.length) {
      const availableTopics = topics.filter(topic => topicIsAvailable(character, topic));
      
      if (availableTopics.length) {
        availableTopics.forEach(topic => println(`${bullet} ${topic.option ? topic.option : topic.keyword}`));
        println(`${bullet} Leave`);
      } else {
        // if character isn't handling onTalk, let the player know they are out of topics
        if (!character.onTalk) {
          println(`You have nothing to discuss with **${getName(character.name)}** at this time.`);
        }
        endConversation();
      }
    } else if (Object.keys(topics).length) {
      println(`Select a response:`);
      Object.keys(topics).forEach(topic => println(`${bullet} ${topics[topic].option}`));
    } else {
      endConversation();
    }
  };

  if (preposition === 'to') {
    if (!getCharacter(x)) {
      println(`There is no one here by that name.`);
      return;
    }

    if (!getCharacter(getName(x), getCharactersInRoom(room.id))) {
      println(`There is no one here by that name.`);
      return;
    }

    if (!character.topics) {
      println(`You have nothing to discuss with **${getName(character.name)}** at this time.`);
      return;
    }

    if (typeof(character.topics) === 'string') {
      println(character.topics);
      return;
    }

    if (typeof(character.onTalk) === 'function') {
      character.onTalk({disk, println, getRoom, enterRoom, room, character});
    }

    topics = typeof character.topics === 'function'
      ? character.topics({println, room})
      : character.topics;

    if (!topics.length && !Object.keys(topics).length) {
      println(`You have nothing to discuss with **${getName(character.name)}** at this time.`);
      return;
    }

    // initialize the chat log if there isn't one yet
    character.chatLog = character.chatLog || [];
    disk.conversant = character;
    listTopics(topics);
  } else if (preposition === 'about') {
    if (!disk.conversant) {
      println(`There's nobody here, but the spirits hear you.`);
      return;
    }
    const character = eval(disk.conversant);
    if (getCharactersInRoom(room.id).includes(disk.conversant)) {
      const response = x.toLowerCase();
      if (response.toLowerCase() === 'leave') {
        endConversation();
        println(`*You end the conversation.*`);
      } else if (disk.conversation && disk.conversation[response]) {
        disk.conversation[response].onSelected();
      } else {
        const topic = disk.conversation.length && conversationIncludesTopic(disk.conversation, response);
        const isAvailable = topic && topicIsAvailable(character, topic);
        if (isAvailable) {
          if (topic.line) {
            println(topic.line);
          }
          if (topic.onSelected) {
            topic.onSelected({disk, println, getRoom, enterRoom, room, character});
          }
          // add the topic to the log
          character.chatLog.push(getKeywordFromTopic(topic));
        } else {
          println(`You talk about ${removePunctuation(x)}.`);
          println(`Type the ***keyword*** to select a topic.`);
        }
      }

      // continue the conversation.
      if (disk.conversation) {
        topics = typeof character.topics === 'function'
          ? character.topics({println, room})
          : character.topics;
        listTopics(character);
      }
    } else {
      println(`*That person is no longer available for conversation.*`);
      disk.conversant = undefined;
      disk.conversation = undefined;
    }
  }
};

// list takeable items in room
let take = () => {
  const room = getRoom(disk.roomId);
  const items = (room.items || []).filter(item => item.isTakeable && !item.isHidden);

  if (room.id === 'beginning') {
    takeItem('Henki');
    return;
  }

  if (!items.length) {
    println(`There's nothing to take.`);
    return;
  }

  println(`The following items can be taken:`);
  items.forEach(item => println(`${bullet} ${getName(item.name)}`));
};

// take the item with the given name
// string -> nothing
let takeItem = (itemName) => {
  const room = getRoom(disk.roomId);

  if (room.id === 'beginning' && (itemName === 'it' || itemName === 'presence')) {
    takeItem('Henki');
    return;
  }

  const findItem = item => objectHasName(item, itemName);
  let itemIndex = room.items && room.items.findIndex(findItem);

  if (typeof itemIndex === 'number' && itemIndex > -1) {
    const item = room.items[itemIndex];
    if (item.isTakeable) {
      disk.inventory.push(item);
      room.items.splice(itemIndex, 1);

      if (typeof item.onTake === 'function') {
        item.onTake({disk, println, room, getRoom, enterRoom, item});
      } else {
        println(`You took the ***${getName(item.name)}***.`);
      }
    } else {
      if (typeof item.onTake === 'function') {
        item.onTake({disk, println, room, getRoom, enterRoom, item});
      } else {
        println(item.block || `You can't take that.`);
      }
    }
  } else {
    itemIndex = disk.inventory.findIndex(findItem);
    if (typeof itemIndex === 'number' && itemIndex > -1) {
      println(`You already have that.`);
    } else {
      println(`There's no such thing here.`);
    }
  }
};

// list useable items in room and inventory
let use = () => {
  const room = getRoom(disk.roomId);

  const useableItems = (room.items || [])
    .concat(disk.inventory)
    .filter(item => item.onUse && !item.isHidden);

  if (!useableItems.length) {
    println(`There's nothing to use.`);
    return;
  }

  println(`The following items can be used:`);
  useableItems.forEach((item) => {
    println(`${bullet} ${getName(item.name)}`)
  });
};

// use the item with the given name
// string -> nothing
let useItem = (itemName) => {
  const item = getItemInInventory(itemName) || getItemInRoom(itemName, disk.roomId);

  if (!item) {
    println(`You don't have that.`);
    return;
  }

  if (item.use) {
    console.warn(`Warning: The "use" property for Items has been renamed to "onUse" and support for "use" has been deprecated in text-engine 2.0. Please update your disk, renaming any "use" methods to be called "onUse" instead.`);

    item.onUse = item.use;
  }

  if (!item.onUse) {
    println(`That item doesn't have a use.`);
    return;
  }

  // use item and give it a reference to the game
  if (typeof item.onUse === 'string') {
    const use = eval(item.onUse);
    use({disk, println, getRoom, enterRoom, item});
  } else if (typeof item.onUse === 'function') {
    item.onUse({disk, println, getRoom, enterRoom, item});
  }
};

// list items in room
let items = () => {
  const room = getRoom(disk.roomId);
  const items = (room.items || []).filter(item => !item.isHidden);

  if (!items.length) {
    println(`There's nothing here.`);
    return;
  }

  println(`This area has these things:`);
  items
    .forEach(item => println(`${bullet} ${getName(item.name)}`));
}

// list characters in room
let chars = () => {
  const room = getRoom(disk.roomId);
  const chars = getCharactersInRoom(room.id).filter(char => !char.isHidden)

  if (!chars.length) {
    println(`There's no one here.`);
    return;
  }

  println(`The characters in this area:`);
  chars
    .forEach(char => println(`${bullet} ${getName(char.name)}`));
};

// display help menu
let help = () => {
  println(`Available commands:`)
  disk.helpCommands.forEach(command => println(`${bullet} ${command}`));
};

// handle say command with no args
let say = () => println([`Say what?`, `You don't say.`]);

// say the passed string
// string -> nothing
let sayString = (str) => println(`You say ${removePunctuation(str)}.`);

// retrieve user input (remove whitespace at beginning or end)
// nothing -> string
let getInput = () => input.value.trim();

// objects with methods for handling commands
// the array should be ordered by increasing number of accepted parameters
// e.g. index 0 means no parameters ("help"), index 1 means 1 parameter ("go north"), etc.
// the methods should be named after the command (the first argument, e.g. "help" or "go")
// any command accepting multiple parameters should take in a single array of parameters
// if the user has entered more arguments than the highest number you've defined here, we'll use the last set
let commands = [
  // no arguments (e.g. "help", "chars", "inv")
  {
    inv,
    i: inv, // shortcut for inventory
    look,
    l: look, // shortcut for look
    go,
    n,
    s,
    e,
    w,
    ne,
    se,
    sw,
    nw,
    talk,
    t: talk, // shortcut for talk
    take,
    get: take,
    items,
    use,
    chars,
    help,
    say,
    //save,
    //load,
    restore: load,
    open,
    close,
    feel,
    eat,
    drink,
    mistletoe,
    quests,
    swing: swingAt,
  },
  // one argument (e.g. "go north", "take book")
  {
    look: lookThusly,
    go: goDir,
    take: takeItem,
    get: takeItem,
    use: useItem,
    say: sayString,
    //save: x => save(x),
    //load: x => load(x),
    //restore: x => load(x),
    open: x => open(x),
    close: x => close(x),
    feel: feel,
    eat: eat,
    drink: drink,
    swing: swingAt,
    mistletoe: mistletoe,
    x: x => lookAt([null, x]), // IF standard shortcut for look at
    t: x => talkToOrAboutX('to', x), // IF standard shortcut for talk
  },
  // two+ arguments (e.g. "look at key", "talk to mary")
  {
    look: lookAt,
    swing: swingAt,
    eat: eat,
    drink: drink,
    say(args) {
      const str = args.reduce((cur, acc) => cur + ' ' + acc, '');
      sayString(str);
    },
    talk: args => talkToOrAboutX(args[0], args[1]),
    x: args => lookAt([null, ...args]),
  },
];

const inspirationalQuotes = [
  `You have not failed. You've just found 10,000 ways that won't work.`,
  `Success is not final, failure is not fatal: it is the courage to continue that counts.`,
  `There is only one thing that makes a dream impossible to achieve: the fear of failure.`,
  `Pain is temporary. Quitting lasts forever.`,
  `Failure is the condiment that gives success its flavor.`,
  `Do not fear failure but rather fear not trying.`,
  `Have no fear of perfection - you'll never reach it.`,
  `Success is stumbling from failure to failure with no loss of enthusiasm.`,
  `Don't spend time beating on a wall, hoping to transform it into a door.`,
  `To err is human, to forgive, divine.`,
  `My fault, my failure, is not in the passions I have, but in my lack of control of them.`,
  `It is hard to fail, but it is worse never to have tried to succeed.`,
  `Only those who dare to fail greatly can ever achieve greatly.`,
  `Never confuse a single defeat with a final defeat.`,
  `Just because you fail once doesn't mean you're gonna fail at everything.`,
  `My past is everything I failed to be.`,
  `You didn't fail, you just found 100 ways to do it wrong.`,
  `If you fell down yesterday, stand up today.`,
  `We are all failures- at least the best of us are.`,
  `Try again. Fail again. Fail better.`,
  `If you're not prepared to be wrong, you'll never come up with anything original.`,
  `Failure is only the opportunity more intelligently to begin again.`,
  `The phoenix must burn to emerge.`,
  `Success, after all, loves a witness, but failure can't exist without one.`,
  `Failures are the stairs we climb to reach success.`,
  `How much you can learn when you fail determines how far you will go into achieving your goals.`,
  `Doubt kills more dreams than failure ever will.`,
  `There is no failure except in no longer trying.`,
  `The only real mistake is the one from which we learn nothing.`,
  `Every adversity, every failure, every heartache carries with it the seed of an equal or greater benefit.`,
  `Failures are finger posts on the road to achievement.`,
  `It's failure that gives you the proper perspective on success.`,
  `The master has failed more times than the beginner has even tried.`,
  `it's not how far you fall, but how high you bounce that counts.`,
  `Giving up is the only sure way to fail.`,
  `Sometimes it takes a wrong turn to get you to the right place.`,
  `You may be disappointed if you fail, but you are doomed if you don’t try.`,
  `Don't worry about being effective. Just concentrate on being faithful to the truth.`,
  `Defeat is not the worst of failures. Not to have tried is the true failure.`,
  `It is not a failure to readjust my sails to fit the waters I find myself in.`,
  `You make mistakes, mistakes don't make you.`,
  `Failure is when you talk yourself out of becoming something amazing.`,
  `Failure is a greater teacher than success.`,
  `What seems to us as bitter trials are often blessings in disguise.`,
  `For some unknown reason, success usually occurs in private, while failure occurs in
  full view.`,
]

const pickQuote = () => {
  const index = Math.floor(Math.random() * inspirationalQuotes.length);
  return inspirationalQuotes[index]; 
}

// process user input & update game state (bulk of the engine)
// accepts optional string input; otherwise grabs it from the input element
let applyInput = (input) => {
  input = input || getInput();
  inputs.push(input);
  inputsPos = inputs.length;
  println(`> ${input}`);

  const val = input.toLowerCase();
  setInput(''); // reset input field

  if (input.startsWith('go to')) {
    goDir('to')
    return;
  }

  if (input === 'open my eyes' || input === 'open your eyes') {
    open('eyes');
    return;
  }

  if (input.length === 0) {
    println('You seem awfully quiet...');
    return;
  }

  const exec = (cmd, arg) => {
    if (cmd) {
      cmd(arg);
    } else if (disk.conversation) {
      println(`Type only the ***keyword*** to select a line.`);
    } else {
      const room = getRoom(disk.roomId)
      // wrong answer to Bearded Fellow's question
      if (room.id === 'nextToHut' && inputs[inputs.length-2].toLowerCase() === 'what') {
        println(`"Wrong!" bellows the **Bearded Fellow** as he swings his axe with great force.`)
        toHel(`You have a faint memory of stealing from the wrong person.
        You realise you are quite dead.`)
        return
      }
      println(pickQuote());
    }
  };

  let args = val.split(' ')

  // remove articles (except for the say command, which prints back what the user said)
  if (args[0] !== 'say') {
    args = args.filter(arg => arg !== 'a' && arg !== 'an' && arg != 'the');
  }

  const [command, ...arguments] = args;
  const room = getRoom(disk.roomId);

  if (arguments.length === 1) {
    exec(commands[1][command], arguments[0]);
  } else if (command === 'take' && arguments.length) {
    // support for taking items with spaces in the names
    // (just tries to match on the first word)
    takeItem(arguments[0]);
  } else if (command === 'use' && arguments.length) {
    // support for using items with spaces in the names
    // (just tries to match on the first word)
    useItem(arguments[0]);
  } else if (arguments.length >= commands.length) {
    exec(commands[commands.length - 1][command], arguments);
  } else if (room.exits && getExit(command, room.exits)) {
    // handle shorthand direction command, e.g. "EAST" instead of "GO EAST"
    goDir(command);
  } else if (disk.conversation && (disk.conversation[command] || conversationIncludesTopic(disk.conversation, command))) {
    talkToOrAboutX('about', command);
  } else {
    exec(commands[arguments.length][command], arguments);
  }
};

// allows wrapping text in special characters so println can convert them to HTML tags
// string, string, string -> string
let addStyleTags = (str, char, tagName) => {
  let odd = true;
  while (str.includes(char)) {
    const tag = odd ? `<${tagName}>` : `</${tagName}>`;
    str = str.replace(char, tag);
    odd = !odd;
  }

  return str;
};

// overwrite user input
// string -> nothing
let setInput = (str) => {
  input.value = str;
  // on the next frame, move the cursor to the end of the line
  setTimeout(() => {
    input.selectionStart = input.selectionEnd = input.value.length;
  });
};

// render output, with optional class
// (string | array | fn -> string) -> nothing
let println = (line, className) => {
  // bail if string is null or undefined
  if (!line) {
    return;
  }

  str =
    // if this is an array of lines, pick one at random
    Array.isArray(line) ? pickOne(line)
    // if this is a method returning a string, evaluate it
    : typeof line  === 'function' ? line()
    // otherwise, line should be a string
    : line;

  const output = document.querySelector('#output');
  const newLine = document.createElement('div');

  if (className) {
    newLine.classList.add(className);
  }

  // add a class for styling prior user input
  if (line[0] === '>') {
    newLine.classList.add('user');
  }

  // support for markdown-like bold, italic, underline & strikethrough tags
  if (className !== 'img') {
    str = addStyleTags(str, '__', 'u');
    str = addStyleTags(str, '**', 'b');
    str = addStyleTags(str, '*', 'i');
    str = addStyleTags(str, '~~', 'strike');
  }

  // maintain line breaks
  while (str.includes('\n')) {
    str = str.replace('\n', '<br>');
  }

  output.appendChild(newLine).innerHTML = str;
  window.scrollTo(0, document.body.scrollHeight);
};

// predict what the user is trying to type
let autocomplete = () => {
  const room = getRoom(disk.roomId);
  const words = input.value.toLowerCase().trim().split(/\s+/);
  const wordsSansStub = words.slice(0, words.length - 1);
  const itemNames = (room.items || []).concat(disk.inventory).map(item => item.name);

  const stub = words[words.length - 1];
  let options;

  if (words.length === 1) {
    // get the list of options from the commands array
    // (exclude one-character commands from auto-completion)
    const allCommands = commands
      .reduce((acc, cur) => acc.concat(Object.keys(cur)), [])
      .filter(cmd => cmd.length > 1);

    options = [...new Set(allCommands)];
    if (disk.conversation) {
      options = Array.isArray(disk.conversation)
        ? options.concat(disk.conversation.map(getKeywordFromTopic))
        : Object.keys(disk.conversation);
      options.push('leave');
    }
  } else if (words.length === 2) {
    const optionMap = {
      talk: ['to', 'about'],
      take: itemNames,
      use: itemNames,
      go: (room.exits || []).map(exit => exit.dir),
      look: ['at'],
    };
    options = optionMap[words[0]];
  } else if (words.length === 3) {
    const characterNames = (getCharactersInRoom(room.id) || []).map(character => character.name);
    const optionMap = {
      to: characterNames,
      at: characterNames.concat(itemNames),
    };
    options = (optionMap[words[1]] || []).flat().map(string => string.toLowerCase());
  }

  const stubRegex = new RegExp(`^${stub}`);
  const matches = (options || []).flat().filter(option => option.match(stubRegex));

  if (!matches.length) {
    return;
  }

  if (matches.length > 1) {
    const longestCommonStartingSubstring = (arr1) => {
      const arr = arr1.concat().sort();
      const a1 = arr[0];
      const a2 = arr[arr.length-1];
      const L = a1.length;
      let i = 0;
      while (i < L && a1.charAt(i) === a2.charAt(i)) {
        i++;
      }
      return a1.substring(0, i);
    };

    input.value = [...wordsSansStub,longestCommonStartingSubstring(matches)].join(' ');
  } else {
    input.value = [...wordsSansStub, matches[0]].join(' ');
  }
};

// select previously entered commands
// string -> nothing
let navigateHistory = (dir) => {
  if (dir === 'prev') {
    inputsPos--;
    if (inputsPos < 0) {
      inputsPos = 0;
    }
  } else if (dir === 'next') {
    inputsPos++;
    if (inputsPos > inputs.length) {
      inputsPos = inputs.length;
    }
  }

  setInput(inputs[inputsPos] || '');
};

// get random array element
// array -> any
let pickOne = arr => arr[Math.floor(Math.random() * arr.length)];

// return the first name if it's an array, or the only name
// string | array -> string
let getName = name => typeof name === 'object' ? name[0] : name;

// retrieve room by its ID
// string -> room
let getRoom = (id) => {
  if (typeof id === 'object' && id.id) id = id.id
  return disk.rooms.find(room => room.id === id)
};

let getQuest = (id) => {
  return player.quests.find(quest => quest.id === id)
}

// remove punctuation marks from a string
// string -> string
let removePunctuation = str => str.replace(/[.,\/#?!$%\^&\*;:{}=\_`~()]/g,"");

// remove extra whitespace from a string
// string -> string
let removeExtraSpaces = str => str.replace(/\s{2,}/g," ");

// move the player into room with passed ID
// string -> nothing
let enterRoom = (id) => {
  if (typeof(id) === 'object' && id.id) id = id.id;
  roomHistory.push(id)
  player.inCombat = false;
  const room = getRoom(id);
  
  if (!room) {
    println(`That exit doesn't seem to go anywhere.`);
    return;
  }
  
  if (room.foes) {
    room.foes.forEach(foe => {
      if (foe.inCombat === true) {
        player.inCombat = true
        return;
      }
    }) 
  }

  if (player.eyesAreOpen) {
    selectStylesheet(`styles/${id}.css`);
  } else {
    selectStylesheet(`styles/eyesClosed.css`);
  }

  println(room.img, 'img');

  if (room.name) {
    println(`${getName(room.name)}`, 'room-name');
  }

  if (room.visits === 0) {
    println(room.desc);
  }

  room.visits++;

  disk.roomId = id;

  if (typeof room.onEnter === 'function') {
    room.onEnter({disk, println, getRoom, enterRoom});
  }

  // reset any active conversation
  delete disk.conversation;
  delete disk.conversant;
};

// determine whether the object has the passed name
// item | character, string -> bool
let objectHasName = (obj, name) => {

  // handle many words in item name
  if (Array.isArray(name)) {
    let newName = ''
    for (let n of name) {
      newName += ` ${n}`
    }
    name = newName
  }

  if (typeof(name) === 'string') name = name.toLowerCase()
  if (typeof(obj) === 'string') return obj.includes(name)

  // characters
  if (Array.isArray(obj.name)) {
    const found = obj.name.map(oneName => {
      if (oneName.toLowerCase() === name) return true
    })
    if (found.includes(true)) return true
    return false
  }

  if (typeof(obj.name) === 'string') {
    if (obj.name.toLowerCase().includes(name) || name.includes(obj.name.toLowerCase())) return true
    return false
  }
}

// get a list of all characters in the passed room
// string -> characters
let getCharactersInRoom = (roomId) => disk.characters.filter(c => c.roomId === roomId);

// get a character by name from a list of characters
// string, characters -> character
let getCharacter = (name, chars = disk.characters) => chars.find(char => objectHasName(char, name));

// remove a character
let removeCharacter = (name) => disk.characters = disk.characters.filter(char => !char.name.includes(name))

// get item by name from room with ID
// string, string -> item
let getFoeInRoom = (name, roomId) => {
  const room = getRoom(roomId);

  if (room.foes) {
    return room.foes.find(foe => objectHasName(foe, name));
  } else {
    return undefined;
  }
}

// get item by name from room with ID
// string, string -> item
let getItemInRoom = (itemName, roomId) => {
  const room = getRoom(roomId);
  return room.items && room.items.find(item => objectHasName(item, itemName))
};

// get item by name from inventory
// string -> item
let getItemInInventory = (name) => disk.inventory.find(item => objectHasName(item, name));

// retrieves a keyword from a topic
// topic -> string
let getKeywordFromTopic = (topic) => {
  if (topic.keyword) {
    return topic.keyword;
  }

  // find the keyword in the option (the word in all caps)
  const keyword = removeExtraSpaces(removePunctuation(topic.option))
    // separate words by spaces
    .split(' ')
    // find the word that is in uppercase
    // (must be at least 2 characters long)
    .find(w => w.length > 1 && w === w)
    .toLowerCase();

  return keyword;
};

// determine whether the passed conversation includes a topic with the passed keyword
// conversation, string -> boolean
let conversationIncludesTopic = (conversation, keyword) => {
  // NOTHING is always an option
  if (keyword === 'leave') {
    return true;
  }

  if (Array.isArray(disk.conversation)) {
    return disk.conversation.find(t => getKeywordFromTopic(t) === keyword);
  }

  return disk.conversation[keyword];
};

// determine whether the passed topic is available for discussion
// character, topic -> boolean
let topicIsAvailable = (character, topic) => {
  // topic has no prerequisites, or its prerequisites have been met
  const prereqsOk = !topic.prereqs || topic.prereqs.every(keyword => character.chatLog.includes(keyword));
  // topic is not removed after read, or it hasn't been read yet
  const readOk = !topic.removeOnRead || !character.chatLog.includes(getKeywordFromTopic(topic));

  return prereqsOk && readOk;
};

// end the current conversation
let endConversation = () => {
  disk.conversant = undefined;
  disk.conversation = undefined;
};

// load the passed disk and start the game
// disk -> nothing
let loadDisk = (uninitializedDisk) => {
  // initialize the disk
  disk = init(uninitializedDisk);

  // start the game
  enterRoom(disk.roomId);

  // start listening for user input
  setup();

  // focus on the input
  input.focus();
};

// npm support
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = loadDisk;
}
