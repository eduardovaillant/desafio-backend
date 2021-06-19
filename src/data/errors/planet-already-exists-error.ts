export class PlanetAlreadyExistsError extends Error {
  constructor () {
    super('The planet already exists in the database!')
    this.name = 'PlanetAlreadyExistsError'
  }
}
