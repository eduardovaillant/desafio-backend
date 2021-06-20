import { PlanetModel } from '../../../src/domain/models'
import { LoadPlanetByNameRepository, AddPlanetRepository, AddPlanetRepositoryParams, LoadPlanetByIdRepository, ListPlanetsRepository } from '../../../src/data/protocols'
import { mockPlanetModel } from '../../domain/mocks/planet'

export class LoadPlanetByNameRepositorySpy implements LoadPlanetByNameRepository {
  planet: PlanetModel = null
  name: string

  async loadByName (name: string): Promise<PlanetModel> {
    this.name = name
    return this.planet
  }
}

export class ListPlanetsRepositorySpy implements ListPlanetsRepository {
  planets: PlanetModel[] = [mockPlanetModel(), mockPlanetModel()]

  async list (): Promise<PlanetModel[]> {
    return this.planets
  }
}

export class LoadPlanetByIdRepositorySpy implements LoadPlanetByIdRepository {
  planet: PlanetModel = null
  id: string

  async loadById (id: string): Promise<PlanetModel> {
    this.id = id
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
