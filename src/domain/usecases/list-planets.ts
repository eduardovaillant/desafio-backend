import { PlanetModel } from '../models'

export interface ListPlanets {
  list: () => Promise<PlanetModel[]>
}
