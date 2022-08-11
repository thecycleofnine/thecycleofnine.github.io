const godPole5 = {
    id: 'godPole5',
    name: `Fifth wooden pole`,
    desc: `The carving depicts a sly god. A genderfluid god and a shape-shifter god. Below them there are smaller carvings of a ***serpent***, a ***wolf***, a ***girl*** and a peculiar-looking ***horse***.`,
    printDescriptions: true,
    onFeel: () => {
        if (player.eyesAreOpen) {
            if (player.curseOfLoki) {
                println(`Trickery is afoot. You feel cursed with illusions.`)
            } else {
                println(`It feels like trickery is afoot here.`)
            }
        } else {
            if (player.curseOfLoki) {
                println(`You feel cursed as some kind of trickery is most certainly underway.
                This place seems to be the source of your illusions.`)
            } else {
                println(`Some kind of trickery is most certainly underway.
                Illusions are afoot here.`)
            }
        }
    },
    items: [
        {
            name: 'serpent',
            desc: `It's encircling the rune ᛘ and spitting venom.`,
            onSwing: () => println(`The hit doesn't damage the thick scaly serpent skin.`),
        },
        {
            name: 'wolf',
            desc: `The pitch black wolf has a smokey appearance. It's guarding a black gate.`,
            onSwing: () => println(`The axe goes straight through the wolf with a puff of smoke, causing no damage.`),
            onEat: () => println(`You try to grab the ***wolf*** but it's slipping through your fingers as if trying to grab smoke.`),
        },
        {
            name: 'girl',
            desc: `It is a young girl. Half of her face is scorched black and the other half is pale white. She's holding a human skull in her hand.`,
            onSwing: () => println(`What is dead may never die.`),
            onEat: () => {
                println(`You devour a small girl like any sane person would.`)
                toHel(`You have a faint memory of tasting death.
                The taste lingers in your mouth as you realise you are quite dead.`)
            },
        },
        {
            name: 'horse',
            desc: `The shamanic horse has eight legs. It can take the rider on an ecstatic journey as well as a physical one.`,
            onSwing: () => println(`The best ***horse*** hops over the swing with ease and returns gracefully to its place on the god pole.`),
            onEat: () => println(`The best ***horse*** gallops agilely on your teeth as you try to catch it into your jaws to no avail.
            It returns gracefully to its place on the god pole.`),
        }
    ],
    exits: [
        { dir: 'northeast', id: 'godPole4' },
        { dir: 'northwest', id: 'godPole6' },
        { dir: 'north', id: 'fisherVillageAltar' },
        { dir: 'west', id: 'fisherVillageSquare' },
        { dir: 'east', id: 'fisherVillageSquare' },
    ]
}