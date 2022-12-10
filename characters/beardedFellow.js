const beardedFellow = {
  name: ['Bearded Fellow', 'The Bearded Fellow', 'Fellow', 'Bearded'],
  roomId: 'uphill',
  // printed when the player looks at the character
  desc: `His build is like a tree trunk.
    The long reddish beard is well-groomed and dripping with mead.
    His sharp blue eyes contain the whole slowly exploding universe.`,
  onSwing: () => {
    println(`The **Bearded Fellow** catches the axe midair.
      There's a whole raging universe in his eyes.
      "No." he says with a disturbing calmness and lets go of the axe.`);
  },
  // optional callback, run when the player talks to this character
  onTalk: () => println(`"Hello, friend!" the ***Bearded Fellow*** shouts much too loud, "Will you slay many giants!?"`),
  onEat: () => println(`"Er..." the **Bearded Fellow** leans back in discomfort.
                        It seems you have caught him off guard.
                        "I...I don't like that." he says uncomfortably.`),
  // things the player can discuss with the character
  topics: [
    {
      option: '***What*** ?',
      removeOnRead: true,
      onSelected: () => {
        println(`"Will you slay many giants?!" the ***Bearded Fellow*** repeats with a boom as his clear blue eyes twinkle with excitement.`);
      }
    },
    {
      option: '***Yes***, I will.',
      removeOnRead: true,
      // optional callback, run when the player selects this option
      onSelected: () => {
        disk.helpCommands.push('swing at');
        println(`***Quests** accepted.*`)
        println(`"Ha! I like you!" he booms and the mountains echo.
          The **Bearded Fellow** gulps down his juniper mead in one giant swallow.
          "Here, take this" he gives you a ***Fine Axe***.`);
        player.quests.push({
          id: 'slayManyGiants',
          name: `Slay many giants`,
          completed: false,
          failed: false
        })
        disk.characters[0].onTalk = () => println(`"Hello again, friend!" bellows the **Bearded Fellow**.
          "I see the axe suits you rather well!"`);
        const char = getCharacter('Bearded Fellow')
        char.chatLog = []
        char.topics = [
          {
            option: `***Thank*** you.`,
            line: `"You're welcome!" he roars with some might.
              "Slay many giants with this axe!"`,
            removeOnRead: true,
            onSelected: () => {
              endConversation()
              println('The **Bearded Fellow** starts to descend a steep mountainside to the ***northwest***.')
              println(`*The conversation has ended.*`);

              getRoom('uphill').desc = `There's a steep incline up a foul-looking mountain to the **east**. The peak is covered with thick sheets of ice.
                There's a wooden ***log*** sitting on the ground. You can ***swing at*** it.`
              disk.characters[0].roomId = undefined;
            }
          },
          {
            option: `***What*** 's this axe?`,
            line: `"It's an axe!" he roars with some might.
              "And a fine one too" he says as he tries to find another bottle of juniper mead without success.
              "Slay many giants with this axe!"`,
            removeOnRead: true,
            onSelected: () => {
              endConversation()
              println(`*The conversation has ended.*`);
              disk.characters[0].roomId = undefined;
              getRoom('uphill').desc = `There's a steep incline up a foul-looking mountain to the **east**. The peak is covered with thick sheets of ice.
                There's a wooden ***log*** sitting on the ground. You can ***swing at*** it.`
              println('The **Bearded Fellow** starts to descend a steep mountainside to the ***northwest***.')
            }
          },
        ];

        // add a special item to the player's inventory
        disk.inventory.push({
          name: 'Fine Axe',
          desc: `The axe is made of the frozen tears of a giant.
            Tou use it you can ***swing at*** things.`,
          onUse: () => {
            println(`You swing the ***Fine Axe*** aimlessly.
              The nearby spirits are terrified.`)
          },
          onSwing: () => println('What a concept!')
        });
      },
    },
    {
      option: '***No***, I will not slay any giants.',
      line: `"Oh" the **Bearded Fellow** says disappointed.
        "It seems we have nothing in common then, goodbye!"`,
      removeOnRead: true,
      onSelected: () => {
        endConversation()
        println(`*The conversation has ended.*`);
      }
    },
  ],
  uphillTopicsAfterLeaving: [
    {
      option: `***How*** can I slay giants?`,
      removeOnRead: true,
      onSelected: () => {
        if (getItemInInventory('Fine Axe')) {
          println(`"What do you mean, friend?" the **Bearded Fellow** asks confused.
            "I gave you the axe, didn't I?
            ***Swing at*** many giants with that axe!"`)
          endConversation()
        } else {
          println(`"Ha!" the **Bearded Fellow** lets out in exitement.
            "Here you go my friend!" he gives you a **Fine Axe**.
            "Slay many giants with this axe!"`)
          disk.inventory.push({
            name: 'Fine Axe',
            desc: `The axe is made of the frozen tears of a giant.
              Tou use it you can ***swing at*** things.`,
            onUse: () => {
              println(`You swing the ***Fine Axe*** aimlessly.
                The nearby spirits are terrified.`)
            },
            onSwing: () => println('What a concept!')
          });
          endConversation()
        }
      }
    },
    {
      option: `***Yes*** I have slain many giants!`,
      removeOnRead: true,
      onSelected: () => {
        if (player.slayedGiants >= 3) {
          println(`"Ha! I knew you'd be up to it!" the **Bearded Fellow** laughs.
            "And it seems to me you have found yourself on the way!" he says as he continues to gulp on his juniper mead.`)
          endConversation()
        } else {
          println(`"Liar!" roars the **Bearded Fellow** as he sends you flying with a mighty swing.`)
          toHel(`You have a faint memory of lying to the wrong person.
            You realise you are quite dead.`)
        }
      }
    },
    {
      option: `***No*** not yet.`,
      removeOnRead: true,
      onSelected: () => {
        println(`"Oh." the **Bearded Fellow** says disappointed.
          "Well, you have plenty of time, friend!" he encourages you.
          "Come to me when you have slain many giants!"`)
        println(`*The conversation has ended.*`)
        endConversation()
      }
    }
  ],
  topicsAfterBreakingIn: [
    {
      option: `***Nothing***.`,
      removeOnRead: true,
      line: `"Liar!" he booms at your face.
        "My patience is running thin, arseling." he grips his axe.
        "What were you doing in my hut!?"`
    },
    {
      option: `***Just*** looked around. I didn't know it was yours.`,
      removeOnRead: true,
      onSelected: () => {
        const horn = getItemInInventory('Golden Horn')
        if (!horn) {
          println(`"Well then." the **Bearded Fellow** calms down.
            "No harm done! Off to find a new door!" he laughs as he strolls away.`)
          const room = getRoom('nextToHut')
          room.exits.forEach(exit => delete exit.block)
          const char = getCharacter('Bearded Fellow')
          char.roomId = 'uphill'
          char.chatLog = []
          char.topics = char.upHillTopicsAfterLeaving
          endConversation()
        } else {
          println(`"Liar!" shouts the **Bearded Fellow** as he swings his axe with a mighty force.`)
          toHel(`You have a faint memory of lying to the wrong person.
            You realise you are quite dead.`)
        }
      }
    },
    {
      option: `***Seems*** unreasonable.`,
      prereqs: ['found'],
      removeOnRead: true,
      line: `"Not at all, my friend, not at all." the **Bearded Fellow** responds absentmindedly as he grips his axe.`
    },
    {
      option: `***What*** is the question?`,
      prereqs: ['found'],
      removeOnRead: true,
      line: `"The question is" proclaims the **Bearded Fellow**.
        "What lies at the center of Hodr's forest?"`,
      onSelected: () => {
        const char = getCharacter('Bearded Fellow')
        char.topics = []
      }
    },
    {
      option: `(***attack*** the Bearded Fellow)`,
      prereqs: ['found'],
      removeOnRead: true,
      line: `The **Bearded Fellow** is a lot faster than you.
        He swings his axe with a mighty force towards your neck.`,
      onSelected: () => {
        enterRoom('valhall')
      }
    },
  ],
}