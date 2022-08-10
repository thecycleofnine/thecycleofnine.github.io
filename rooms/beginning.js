const beginning = {
    id: 'beginning', // unique ID for this room
    name: 'The Beginning', // room name (shown when player enters the room)                                                                          
    // room description (shown when player first enters the room)
    desc: `You are surrounded by a warm darkness.
    It's mushy and comfortable.
    Try to ***look*** around.`,
    // optional callback when player issues the LOOK command
    // here, we use it to change the foyer's description
    onLook: () => {
        const room = getRoom('beginning');
        room.desc = `It's wonderful here.`;
    },
    onFeel: () => {
        if (getItemInInventory('Henki')) {
            println(`It's all mushy around you.
        You feel alive.`)
        } else {
            if (!disk.helpCommands.includes('take')) disk.helpCommands.push('take');
            println(`It's all mushy around you.
        But you feel empty. 
        There's a faint presence floating around.
        You feel an urge to ***take*** it.`)
        }
    },
    items: [
        {
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
                println(`Nothing happens.`)
            },
            onEat: () => println(`What a concept!`)
        }
    ],
    // places the player can go from this room
    exits: [
        // GO NORTH command leads to the Reception Desk
        {
            dir: 'north', id: 'rockyPlace', block: `You are still but an empty shell.
      It's dangerous to go alone.`},
    ],
    music: 'gudernes-vilje.mp3',
}