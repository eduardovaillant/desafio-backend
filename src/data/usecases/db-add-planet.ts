import { PlanetModel } from '../../domain/models'
import { AddPlanet, AddPlanetParams } from '../../domain/usecases'
import { LoadPlanetByNameRepository } from '../protocols'
import { SwapiClient } from '../protocols/swapi-client'
import { InvalidPlanetTerrainError, InvalidPlanetNameError, InvalidPlanetClimateError } from '../errors'

export class DbAddPlanet implements AddPlanet {
  constructor (
    private readonly loadPlanetByNameRepository: LoadPlanetByNameRepository,
    private readonly swapiClient: SwapiClient
  ) {}

  async add (addPlanetParams: AddPlanetParams): Promise<PlanetModel> {
    const loadedPlanet = await this.loadPlanetByNameRepository.loadByName(addPlanetParams.name)
    if (loadedPlanet) {
      return null
    }
    const result = await this.swapiClient.search(addPlanetParams.name)
    if (!result) {
      throw new InvalidPlanetNameError()
    }

    if (result.terrain !== addPlanetParams.terrain) {
      throw new InvalidPlanetTerrainError()
    }

    if (result.climate !== addPlanetParams.climate) {
      throw new InvalidPlanetClimateError()
    }

    return null
  }
}
