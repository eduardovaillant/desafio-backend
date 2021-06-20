import { PlanetModel } from '../../../src/domain/models'
import { mockPlanetModel } from '../mocks/planet'
import { LoadPlanetById, LoadPlanetByName } from '.'

export class LoadPlanetByNameSpy implements LoadPlanetByName {
  name: string
  planetModel: PlanetModel = mockPlanetModel()

  async loadByName (name: string): Promise<PlanetModel> {
    this.name = name
    return this.planetModel
  }
}

export class LoadPlanetByIdSpy implements LoadPlanetById {
  id: string
  planetModel: PlanetModel = mockPlanetModel()

  async loadById (id: string): Promise<PlanetModel> {
    this.id = id
    return this.planetModel
  }
}
