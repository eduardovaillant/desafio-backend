import { PlanetModel } from '../../../src/domain/models'
import { AddPlanetRepository, AddPlanetRepositoryParams, LoadPlanetByIdRepository, ListPlanetsRepository, RemovePlanetRepository, CheckPlanetByNameRepository, LoadPlanetsByNameRepository } from '../../../src/data/protocols'
import { mockPlanetModel } from '../../domain/mocks/planet'

export const mockAddPlanetRepositoryParams = (): AddPlanetRepositoryParams => (
  {
    name: 'any_name',
    terrain: 'any_terrain',
    climate: 'any_climate',
    movie_apparitions: 1
  }
)

export class AddPlanetRepositorySpy implements AddPlanetRepository {
  planet: PlanetModel = mockPlanetModel()
  addPlanetRepositoryParams: AddPlanetRepositoryParams

  async add (addPlanetRepositoryParams: AddPlanetRepositoryParams): Promise<PlanetModel> {
    this.addPlanetRepositoryParams = addPlanetRepositoryParams
    return this.planet
  }
}

export class CheckPlanetByNameRepositorySpy implements CheckPlanetByNameRepository {
  result: boolean = false
  name: string

  async checkByName (name: string): Promise<boolean> {
    this.name = name
    return this.result
  }
}

export class ListPlanetsRepositorySpy implements ListPlanetsRepository {
  planets: PlanetModel[] = [mockPlanetModel(), mockPlanetModel()]

  async list (): Promise<PlanetModel[]> {
    return this.planets
  }
}

export class LoadPlanetsByNameRepositorySpy implements LoadPlanetsByNameRepository {
  planets: PlanetModel[] = [mockPlanetModel(), mockPlanetModel()]
  name: string

  async loadByName (name: string): Promise<PlanetModel[]> {
    this.name = name
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

export class RemovePlanetRepositorySpy implements RemovePlanetRepository {
  id: string
  removed: boolean = true

  async remove (id: string): Promise<boolean> {
    this.id = id
    return this.removed
  }
}
