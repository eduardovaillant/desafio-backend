import { PlanetModel } from '../../../domain/models'
import { AddPlanet, AddPlanetParams } from '../../../domain/usecases'
import { LoadPlanetByNameRepository } from '../protocols'

export class DbAddPlanet implements AddPlanet {
  constructor (
    private readonly loadPlanetByNameRepository: LoadPlanetByNameRepository
  ) {}

  async add (addPlanetParams: AddPlanetParams): Promise<PlanetModel> {
    const planet = await this.loadPlanetByNameRepository.loadByName(addPlanetParams.name)
    if (planet) {
      return null
    }
    return null
  }
}
