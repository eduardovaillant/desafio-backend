import { PlanetModel } from '../../../src/domain/models'
import { ListPlanets, LoadPlanetById, LoadPlanetsByName, AddPlanet, AddPlanetParams, RemovePlanet } from '../../../src/domain/usecases'
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
  planets: PlanetModel[] = [mockPlanetModel(), mockPlanetModel()]

  async list (): Promise<PlanetModel[]> {
    return this.planets
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
