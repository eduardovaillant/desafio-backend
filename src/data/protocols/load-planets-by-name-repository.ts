import { PlanetModel } from '../../domain/models'

export interface LoadPlanetsByNameRepository {
  loadByName: (name: string) => Promise<PlanetModel[]>
}
