import { LoadPlanetsByNameRepository } from '../protocols'
import { PlanetModel } from '../../domain/models'
import { LoadPlanetsByName } from '../../domain/usecases'

export class DbLoadPlanetsByName implements LoadPlanetsByName {
  constructor (
    private readonly loadPlanetsByNameRepository: LoadPlanetsByNameRepository
  ) {}

  async loadByName (name: string): Promise<PlanetModel[]> {
    const planets = await this.loadPlanetsByNameRepository.loadByName(name)
    return planets
  }
}
