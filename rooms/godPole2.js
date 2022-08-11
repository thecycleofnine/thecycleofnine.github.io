const godPole2 = {
    id: 'godPole2',
    name: `Second wooden pole`,
    desc: `The carving depicts a fearsome god with a massive beard braided in two sections. The god is wearing a helmet and gripping a hammer with one hand and the reins of a chariot pulled by two ***goats*** with the other hand.`,
    printDescriptions: true,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`You feel a strengthful presence. There is a feeling of static charge in the air. Something powerful is brewing above.`)
        } else {
            println(`You feel pure strength and passion. There is a feeling of static charge in the air. Tall clouds are forming directly above the god pole.`)
        }
    },
    items: [
        {
            name: 'goats',
            desc: `The dutiful goats are pulling the chariot on which the god rides like lightning. One of the goats seems to have broken a bone for some reason.`,
            onSwing: () => {
                println(`The wooden goats get slaughtered.
                ***Goat meat** has been added to your inventory.*
                The goats are resurrected.`)
                if (!getItemInInventory('Goat meat (wooden)')) {
                    disk.inventory.push({
                        name: 'Goat meat (wooden)',
                        desc: `The wooden goat meat is everfresh and nourishing.`,
                        onEat: () => {
                            player.hp = 100
                            println(`You munch on the wooden ***Goat meat*** of the gods.
                            Your ***Henki*** has been restored to full HP!`)
                            disk.inventory = disk.inventory.filter(i => i.name !== 'Goat meat (wooden)')
                        },
                        onSwing: () => {
                            println(`The ***Goat meat*** of the gods is spoiled!`)
                            disk.inventory = disk.inventory.filter(i => i.name !== 'Goat meat (wooden)')
                        }
                    })
                }
            },
            onEat: () => {
                player.hp = 100
                println(`You munch on the wooden ***Goat meat*** of the gods.
                Your ***Henki*** has been restored to full HP!`)
            },
        }
    ],
    exits: [
        { dir: 'northwest', id: 'godPole1' },
        { dir: 'southeast', id: 'godPole3' },
        { dir: 'southwest', id: 'fisherVillageAltar' },
        { dir: 'north', id: 'fisherVillageSquare' },
    ]
}