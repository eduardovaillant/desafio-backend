import { PlanetModel } from '../../../src/domain/models'
import { AddPlanetRepository, AddPlanetRepositoryParams, LoadPlanetByIdRepository, ListPlanetsRepository, RemovePlanetRepository, CheckPlanetByNameRepository, LoadPlanetsByNameRepository, PlanetsModel } from '../../../src/data/protocols'
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
  planets: PlanetsModel = {
    count: 11,
    planets: [
      mockPlanetModel(),
      mockPlanetModel(),
      mockPlanetModel(),
      mockPlanetModel(),
      mockPlanetModel(),
      mockPlanetModel(),
      mockPlanetModel(),
      mockPlanetModel(),
      mockPlanetModel(),
      mockPlanetModel(),
      mockPlanetModel()
    ]
  }

  page: number

  async list (page: number): Promise<PlanetsModel> {
    this.page = page
    return this.planets
  }
}

export class LoadPlanetsByNameRepositorySpy implements LoadPlanetsByNameRepository {
  planets: PlanetsModel = {
    count: 11,
    planets: [
      mockPlanetModel(),
      mockPlanetModel(),
      mockPlanetModel(),
      mockPlanetModel(),
      mockPlanetModel(),
      mockPlanetModel(),
      mockPlanetModel(),
      mockPlanetModel(),
      mockPlanetModel(),
      mockPlanetModel(),
      mockPlanetModel()
    ]
  }

  page: number
  name: string

  async loadByName (name: string, page: number): Promise<PlanetsModel> {
    this.name = name
    this.page = page
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
