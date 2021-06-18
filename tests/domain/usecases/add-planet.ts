import { AddPlanet, AddPlanetParams } from '../../../src/domain/usecases/add-planet'
import { PlanetModel } from '../../../src/domain/models'
import { mockPlanetModel } from '../mocks/planet'

export class AddPlanetSpy implements AddPlanet {
  planet: AddPlanetParams
  planetModel: PlanetModel = mockPlanetModel()

  async add (planet: AddPlanetParams): Promise<PlanetModel> {
    this.planet = planet
    return this.planetModel
  }
}
