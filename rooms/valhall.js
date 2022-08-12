const valhall = {
    id: 'valhall',
    area: 'Valhall',
    name: 'Valhall',
    onLook: () => {
        println(`TBA`)
    },
    onFeel: () => {
        if (player.eyesAreOpen) {
            println(`TBAopen`)
        } else {
            println(`TBAclosed`)
        }
    },
    exits: [
        // TBA
    ]
}