class Boat {
    constructor(boatModel
    ) {
        this.hasMotor=boatModel.hasMotor;
        this.motorCount=boatModel.motorCount;
        this.motorBrand=boatModel.motorBrand;
        this.motorModel= boatModel.motorModel;
        this.hasSails= boatModel.hasSails;
        this.sailsCount=boatModel.sailsCount;
        this.sailsMaterial=boatModel.sailsMaterial;
        this.sailsColor=boatModel.sailsColor;
        this.hullColor=boatModel.hullColor;
        this.hasCabin=boatModel.hasCabin;
    }
}
export class BoatBuilder {
  withMotors(count, brand, model) {
    this.hasMotor = true;
    this.motorCount = count;
    this.motorBrand = brand;
    this.motorModel = model;
    return this;
  }
  withSails(count, material, color) {
    this.hasSails = true;
    this.sailsCount = count;
    this.sailsMaterial = material;
    this.sailsColor = color;
    return this;
  }
  hullColor(color) {
    this.hullColor = color;
    return this;
  }
  withCabin() {
    this.hasCabin = true;
    return this;
  }
  build() {
    return new Boat({
      hasMotor: this.hasMotor,
      motorCount: this.motorCount,
      motorBrand: this.motorBrand,
      motorModel: this.motorModel,
      hasSails: this.hasSails,
      sailsCount: this.sailsCount,
      sailsMaterial: this.sailsMaterial,
      sailsColor: this.sailsColor,
      hullColor: this.hullColor,
      hasCabin: this.hasCabin,
    });
  }
}
