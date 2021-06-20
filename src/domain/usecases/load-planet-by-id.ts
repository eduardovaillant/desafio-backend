import { PlanetModel } from '../models'

export interface LoadPlanetById {
  loadById: (id: string) => Promise<PlanetModel>
}
