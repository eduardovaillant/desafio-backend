import { PlanetModel } from '../models'

export interface LoadPlanetByName {
  loadByName: (name: string) => Promise<PlanetModel>
}
