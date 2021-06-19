export class InvalidPlanetNameError extends Error {
  constructor () {
    super('The planet name is invalid!')
    this.name = 'InvalidPlanetDataError'
  }
}
