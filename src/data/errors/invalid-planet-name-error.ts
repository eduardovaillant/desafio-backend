export class InvalidPlanetNameError extends Error {
  constructor () {
    super('The planet name is Invalid!')
    this.name = 'InvalidaPlanetNameError'
  }
}
