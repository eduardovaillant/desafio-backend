import { PlanetModel } from '../../domain/models'
import { AddPlanet, AddPlanetParams } from '../../domain/usecases'
import { AddPlanetRepository, LoadPlanetByNameRepository } from '../protocols'
import { SwapiClient } from '../protocols/swapi-client'
import { InvalidPlanetTerrainError, InvalidPlanetNameError, InvalidPlanetClimateError } from '../errors'

export class DbAddPlanet implements AddPlanet {
  constructor (
    private readonly loadPlanetByNameRepository: LoadPlanetByNameRepository,
    private readonly swapiClient: SwapiClient,
    private readonly addPlanetRepository: AddPlanetRepository
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

    const addPlanetRepositoryParams = Object.assign(addPlanetParams, { movie_apparitions: result.movie_apparitions })

    await this.addPlanetRepository.add(addPlanetRepositoryParams)

    return null
  }
}
