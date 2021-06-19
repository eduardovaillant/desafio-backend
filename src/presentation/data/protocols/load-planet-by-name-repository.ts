import { PlanetModel } from '../../../domain/models'

export interface LoadPlanetByNameRepository {
  loadByName: (name: string) => Promise<PlanetModel>
}
