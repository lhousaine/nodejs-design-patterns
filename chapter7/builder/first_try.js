class Boat {
  constructor(allParameters) {
    // ... aggregate all constructor parameters in a single argument object lateral.
  }
}

const myBoat = new Boat({ // you need to look to the documentaion each time you would like to create an object
  hasMotor: true,
  motorCount: 2,
  motorBrand: "Best Motor Co. ",
  motorModel: "OM123",
  hasSails: true,
  sailsCount: 1,
  sailsMaterial: "fabric",
  sailsColor: "white",
  hullColor: "blue",
  hasCabin: false,
});
