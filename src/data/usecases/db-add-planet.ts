import { PlanetModel } from '../../domain/models'
import { AddPlanet, AddPlanetParams } from '../../domain/usecases'
import { LoadPlanetByNameRepository } from '../protocols'
import { SwapiClient } from '../protocols/swapi-client'

export class DbAddPlanet implements AddPlanet {
  constructor (
    private readonly loadPlanetByNameRepository: LoadPlanetByNameRepository,
    private readonly swapiClient: SwapiClient
  ) {}

  async add (addPlanetParams: AddPlanetParams): Promise<PlanetModel> {
    const planet = await this.loadPlanetByNameRepository.loadByName(addPlanetParams.name)
    if (planet) {
      return null
    }
    await this.swapiClient.search(addPlanetParams.name)
    return null
  }
}
