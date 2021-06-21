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
  planetModel: PlanetModel[] = [mockPlanetModel()]

  async loadByName (name: string): Promise<PlanetModel[]> {
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

export class ListPlanetsSpy implements ListPlanets {
  paginatedResults: PaginatedResults = {
    count: 2,
    planets: [mockPlanetModel(), mockPlanetModel()],
    next: null,
    previous: null
  }

  async list (page: number = 1): Promise<PaginatedResults> {
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
