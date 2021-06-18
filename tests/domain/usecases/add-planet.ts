import { AddPlanet, AddPlanetParams } from '../../../src/domain/usecases/add-planet'
import { PlanetModel } from '../../../src/domain/models'
import { mockPlanetModel } from '../mocks/planet'

export class AddPlanetSpy implements AddPlanet {
  addPlanetParams: AddPlanetParams
  planetModel: PlanetModel = mockPlanetModel()

  async add (addPlanetParams: AddPlanetParams): Promise<PlanetModel> {
    this.addPlanetParams = addPlanetParams
    return this.planetModel
  }
}
