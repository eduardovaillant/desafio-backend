import { PlanetModel } from '../../domain/models'

export type AddPlanetRepositoryParams = Omit<PlanetModel, 'id'>

export interface AddPlanetRepository {
  add: (addPlanetRepositoryParams: AddPlanetRepositoryParams) => Promise<PlanetModel>
}
