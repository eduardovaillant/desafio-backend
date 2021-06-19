export class InvalidPlanetTerrainError extends Error {
  constructor () {
    super('The planet terrain is invalid!')
    this.name = 'InvalidPlanetDataError'
  }
}
