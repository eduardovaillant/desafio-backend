export class InvalidaPlanetNameError extends Error {
  constructor () {
    super('The planet name is Invalid!')
    this.name = 'InvalidaPlanetNameError'
  }
}
