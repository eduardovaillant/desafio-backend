import { AddPlanetRepository, AddPlanetRepositoryParams, LoadPlanetByNameRepository, SwapiClient } from '../protocols'
import { InvalidPlanetTerrainError, InvalidPlanetNameError, InvalidPlanetClimateError, PlanetAlreadyExistsError } from '../errors'
import { PlanetModel } from '../../domain/models'
import { AddPlanet, AddPlanetParams } from '../../domain/usecases'

export class DbAddPlanet implements AddPlanet {
  constructor (
    private readonly loadPlanetByNameRepository: LoadPlanetByNameRepository,
    private readonly swapiClient: SwapiClient,
    private readonly addPlanetRepository: AddPlanetRepository
  ) {}

  async add (addPlanetParams: AddPlanetParams): Promise<PlanetModel> {
    const loadedPlanet = await this.loadPlanetByNameRepository.loadByName(addPlanetParams.name.toLowerCase())
    if (loadedPlanet) {
      throw new PlanetAlreadyExistsError()
    }

    const result = await this.swapiClient.search(addPlanetParams.name)
    if (!result) {
      throw new InvalidPlanetNameError()
    }

    if (result.name.toLowerCase() !== addPlanetParams.name.toLowerCase()) {
      throw new InvalidPlanetNameError()
    }

    if (result.terrain.toLowerCase() !== addPlanetParams.terrain.toLowerCase()) {
      throw new InvalidPlanetTerrainError()
    }

    if (result.climate.toLowerCase() !== addPlanetParams.climate.toLowerCase()) {
      throw new InvalidPlanetClimateError()
    }

    const addPlanetRepositoryParams: AddPlanetRepositoryParams = {
      name: addPlanetParams.name.toLowerCase(),
      climate: addPlanetParams.climate.toLowerCase(),
      terrain: addPlanetParams.terrain.toLowerCase(),
      movie_apparitions: result.movie_apparitions
    }

    const createdPlanet = await this.addPlanetRepository.add(addPlanetRepositoryParams)

    return createdPlanet
  }
}
