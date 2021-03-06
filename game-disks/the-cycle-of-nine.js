const demoDisk = {
  roomId: 'fisherVillageAltar', // the ID of the room the player starts in
  roomHistory: [],
  inputs: [''],
  inputsPos: 0,
  helpCommands: ['look (at)', 'open', 'feel', 'go', 'quests'],
  player: {
    hp: 100,
    inCombat: false,
    henki: true,
    itse: undefined,
    deaths: 0,
    slayedGiants: 0,
    friggsBlessing: false,
    curseOfLoki: false,
    eyesAreOpen: false,
    quests: [
      {
        id: 'exploreTheWorld',
        name: `Explore the world`,
        completed: false,
        failed: false,
      }
    ]
  },
  rooms: [
    beginning,
    rockyPlace,
    uphill,
    fieldOfEyesAndEars,
    nextToHut,
    insideHut,
    mountainTrail,
    mountainRidge,
    valhalla,
    hel,
    mountainPeak,
    frostLands,
    roadToFrostVillage,
    frostVillageGate,
    frostVillage,
    frostVillageLift,
    frostVillageWall,
    chieftainsHouseEntrance,
    chieftainsHouse,
    frostVillageShrine,
    frostVillageMine,
    hillside,
    fisherVillageGate,
    fisherVillageSquare,
    fisherVillageAltar,
    pathToHodrsForest,
    hodrsForest1,
    hodrsForest2,
    hodrsForest3,
    hodrsForest4,
    hodrsForest5,
    hodrsForest6,
    hodrsForest7,
    hodrsForest8,
    hodrsForest9,
    spiritWorld1,
    spiritWorld2,
    spiritWorld3,
    spiritWorld4,
    spiritWorld5,
  ],
  characters: [
    beardedFellow,
    frostGiant,
    smallFrostGiant,
    housecarl,
    chieftain,
    hela,
    trickster,
    mushlings,
    theThree,
  ],
};
