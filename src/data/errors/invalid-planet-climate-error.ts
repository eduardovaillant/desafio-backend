export class InvalidPlanetClimateError extends Error {
  constructor () {
    super('The planet climate is invalid!')
    this.name = 'InvalidPlanetDataError'
  }
}
