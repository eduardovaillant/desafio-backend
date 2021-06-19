import { PlanetModel } from '../../../src/domain/models'
import { LoadPlanetByNameRepository } from '../../../src/presentation/data/protocols'

export class LoadPlanetByNameRepositorySpy implements LoadPlanetByNameRepository {
  planet: PlanetModel = null
  name: string

  async loadByName (name: string): Promise<PlanetModel> {
    this.name = name
    return this.planet
  }
}
