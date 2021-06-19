import { PlanetModel } from '../../../src/domain/models'
import { LoadPlanetByNameRepository, AddPlanetRepository, AddPlanetRepositoryParams } from '../../../src/data/protocols'
import { mockPlanetModel } from '../../domain/mocks/planet'

export class LoadPlanetByNameRepositorySpy implements LoadPlanetByNameRepository {
  planet: PlanetModel = null
  name: string

  async loadByName (name: string): Promise<PlanetModel> {
    this.name = name
    return this.planet
  }
}

export class AddPlanetRepositorySpy implements AddPlanetRepository {
  planet: PlanetModel = mockPlanetModel()
  addPlanetRepositoryParams: AddPlanetRepositoryParams

  async add (addPlanetRepositoryParams: AddPlanetRepositoryParams): Promise<PlanetModel> {
    this.addPlanetRepositoryParams = addPlanetRepositoryParams
    return this.planet
  }
}

export const mockAddPlanetRepositoryParams = (): AddPlanetRepositoryParams => (
  {
    name: 'any_name',
    terrain: 'any_terrain',
    climate: 'any_climate',
    movie_apparitions: 1
  }
)
