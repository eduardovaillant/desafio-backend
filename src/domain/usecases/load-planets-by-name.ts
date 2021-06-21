import { PaginatedResults } from './list-planets'

export interface LoadPlanetsByName {
  loadByName: (name: string, page: number) => Promise<PaginatedResults>
}
