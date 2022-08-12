const godPole1 = {
    id: 'godPole1',
    area: 'Fisher village',
    name: `First wooden pole`,
    desc: `The carving depicts a god with a well-groomed ***beard*** and extraordinarily sharp eyes. The eyes are not fixated on anything in particular but instead they seem to perceive everything at once. The god is gripping a blowing horn with the right hand and a decorative sword with the left.`,
    printDescriptions: true,
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`You feel noticed. You are being seen and you are being heard.`)
        } else {
            println(`You feel noticed. You are being seen and heard.
            It feels as if the god before you sees everything and hears everything.`)
        }
    },
    items: [
        {
            name: 'beard',
            desc: `It seems to be dripping with fresh mead!`,
            onSwing: () => println(`This is the proper way to groom a beard!`),
            onEat: () => println(`You lick the wooden ***beard*** like any sane person would. It leaves a meady taste in your mouth.`),
        }
    ],
    exits: [
        { dir: 'southeast', id: 'godPole2' },
        { dir: 'southwest', id: 'godPole8' },
        { dir: 'south', id: 'fisherVillageAltar' },
        { dir: 'north', id: 'fisherVillageSquare' },
    ]
}