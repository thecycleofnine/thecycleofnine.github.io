const uphill = {
    id: 'uphill',
    area: 'Mountain of beginnings',
    name: 'Uphill',
    desc: `There's a ***Bearded Fellow*** sitting merrily on a wooden ***log***. He's drinking juniper mead. It seems you could ***talk*** (***to***) him. 
    There's a field to the ***east***. Something seems off about it.`,
    onEnter: () => {
        if (!disk.helpCommands.includes('talk (to)')) disk.helpCommands.push('talk (to)');
    },
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`TBAopen`)
        } else {
            println(`TBAclosed`)
        }
    },
    items: [
        {
            name: 'log',
            desc: `It's a perfectly good wooden log.`,
            onSwing: () => {
                println(getCharacter('Bearded Fellow').roomId === 'uphill' ? `"Woah there!", shouts the **Bearded Fellow** as he jumps up to evade the swing.
          "A mighty swing you got, friend!", he compliments you sincerely as he sits back down.` : `It leaves a big dent but the wooden ***log*** is surprisingly sturdy.`)
            }
        }
    ],
    exits: [
        { dir: 'northwest', id: 'hel' },
        { dir: 'east', id: 'fieldOfEyesAndEars' },
        { dir: 'west', id: 'rockyPlace' }
    ],
}