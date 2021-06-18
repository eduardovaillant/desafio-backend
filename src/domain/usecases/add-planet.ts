import { PlanetModel } from '../models'

export type AddPlanetParams = Omit<PlanetModel, 'id' | 'movie_apparitions'>

export interface AddPlanet {
  add: (addPlanetParams: AddPlanetParams) => Promise<PlanetModel>
}
