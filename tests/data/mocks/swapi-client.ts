import { SwapiClient, SwapiPlanetReturn } from '../../../src/data/protocols/swapi-client'

export const mockSwapiPlanetReturn = (): SwapiPlanetReturn => ({
  name: 'any_name',
  terrain: 'any_terrain',
  climate: 'any_climate',
  movie_apparitions: 1
})

export class SwapiClientSpy implements SwapiClient {
  swapiPlanetReturn: SwapiPlanetReturn = mockSwapiPlanetReturn()
  name: string

  async search (name: string): Promise<SwapiPlanetReturn> {
    this.name = name
    return this.swapiPlanetReturn
  }
}
