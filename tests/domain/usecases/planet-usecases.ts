import { PlanetModel } from '../../../src/domain/models'
import { ListPlanets, LoadPlanetById, LoadPlanetsByName, AddPlanet, AddPlanetParams, RemovePlanet, PaginatedResults } from '../../../src/domain/usecases'
import { mockPlanetModel } from '../mocks/planet'

export class AddPlanetSpy implements AddPlanet {
  addPlanetParams: AddPlanetParams
  planetModel: PlanetModel = mockPlanetModel()

  async add (addPlanetParams: AddPlanetParams): Promise<PlanetModel> {
    this.addPlanetParams = addPlanetParams
    return this.planetModel
  }
}

export class LoadPlanetsByNameSpy implements LoadPlanetsByName {
  name: string
  page: number
  paginatedResults: PaginatedResults = {
    count: 2,
    planets: [mockPlanetModel(), mockPlanetModel()],
    next: null,
    previous: null
  }

  async loadByName (name: string, page: number = 1): Promise<PaginatedResults> {
    this.page = page
    this.name = name
    return this.paginatedResults
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

export class ListPlanetsSpy implements ListPlanets {
  paginatedResults: PaginatedResults = {
    count: 2,
    planets: [mockPlanetModel(), mockPlanetModel()],
    next: null,
    previous: null
  }

  page: number

  async list (page: number = 1): Promise<PaginatedResults> {
    this.page = page
    return this.paginatedResults
  }
}

export class RemovePlanetSpy implements RemovePlanet {
  id: string
  removed: boolean = true

  async remove (id: string): Promise<boolean> {
    this.id = id
    return this.removed
  }
}
