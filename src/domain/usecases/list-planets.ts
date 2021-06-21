import { PlanetModel } from '../models'

export type PaginatedResults = {
  count: number
  next: string
  previous: string
  planets: PlanetModel[]
}

export interface ListPlanets {
  list: (page?: number) => Promise<PaginatedResults>
}
