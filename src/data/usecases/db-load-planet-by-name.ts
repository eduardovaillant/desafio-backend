import { LoadPlanetByNameRepository } from 'data/protocols'
import { PlanetModel } from 'domain/models'
import { LoadPlanetByName } from 'domain/usecases'

export class DbLoadPlanetByName implements LoadPlanetByName {
  constructor (
    private readonly loadPlanetByNameRepository: LoadPlanetByNameRepository
  ) {}

  async loadByName (name: string): Promise<PlanetModel> {
    await this.loadPlanetByNameRepository.loadByName(name.toLowerCase())
    return null
  }
}
