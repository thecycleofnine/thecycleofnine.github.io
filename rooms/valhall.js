const valhall = {
    id: 'valhall',
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
}