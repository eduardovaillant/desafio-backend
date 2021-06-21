import { PlanetModel } from '../models'

export interface LoadPlanetsByName {
  loadByName: (name: string) => Promise<PlanetModel[]>
}
