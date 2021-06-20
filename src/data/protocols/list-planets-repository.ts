import { PlanetModel } from '../../domain/models'

export interface ListPlanetsRepository {
  list: () => Promise<PlanetModel[]>
}
