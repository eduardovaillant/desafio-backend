export class InvalidaPlanetTerrainError extends Error {
  constructor () {
    super('The planet terrain is Invalid!')
    this.name = 'InvalidaPlanetTerrainError'
  }
}
