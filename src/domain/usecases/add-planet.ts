import { PlanetModel } from '../models'

export type AddPlanetParams = Omit<PlanetModel, 'id' | 'movie_apparitions'>

export interface AddPlanet {
  add: (planet: AddPlanetParams) => Promise<PlanetModel>
}
