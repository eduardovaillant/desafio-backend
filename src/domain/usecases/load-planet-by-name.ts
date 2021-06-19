import { PlanetModel } from '../models'

export interface LoadPlanetByName {
  loadByname: (name: string) => Promise<PlanetModel>
}
