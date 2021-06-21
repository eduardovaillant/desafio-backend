import { PlanetsModel } from './list-planets-repository'

export interface LoadPlanetsByNameRepository {
  loadByName: (name: string, page: number) => Promise<PlanetsModel>
}
