import { PlanetModel } from '../../../src/domain/models'
import { mockPlanetModel } from '../mocks/planet'
import { LoadPlanetByName } from '.'

export class LoadPlanetByNameSpy implements LoadPlanetByName {
  name: string
  planetModel: PlanetModel = mockPlanetModel()

  async loadByName (name: string): Promise<PlanetModel> {
    this.name = name
    return this.planetModel
  }
}
