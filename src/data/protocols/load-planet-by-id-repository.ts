import { PlanetModel } from '../../domain/models'

export interface LoadPlanetByIdRepository {
  loadById: (id: string) => Promise<PlanetModel>
}
