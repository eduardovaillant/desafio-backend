import { LoadPlanetByNameRepository } from '../protocols'
import { PlanetModel } from '../../domain/models'
import { LoadPlanetByName } from '../../domain/usecases'

export class DbLoadPlanetByName implements LoadPlanetByName {
  constructor (
    private readonly loadPlanetByNameRepository: LoadPlanetByNameRepository
  ) {}

  async loadByName (name: string): Promise<PlanetModel> {
    const planet = await this.loadPlanetByNameRepository.loadByName(name.toLowerCase())
    return planet
  }
}
