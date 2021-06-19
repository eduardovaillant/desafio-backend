import { PlanetModel } from '../../../src/domain/models'
import { LoadPlanetByNameRepository } from '../../../src/presentation/data/protocols'
import { mockPlanetModel } from '../../domain/mocks/planet'

export class LoadPlanetByNameRepositorySpy implements LoadPlanetByNameRepository {
  planet: PlanetModel = mockPlanetModel()
  name: string

  async loadByName (name: string): Promise<PlanetModel> {
    this.name = name
    return this.planet
  }
}
