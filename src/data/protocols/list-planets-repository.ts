import { PlanetModel } from '../../domain/models'

export interface PlanetsModel {
  count: number
  planets: PlanetModel[]
}

export interface ListPlanetsRepository {
  list: (page: number) => Promise<PlanetsModel>
}
