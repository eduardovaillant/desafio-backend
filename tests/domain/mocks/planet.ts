import { PlanetModel } from '../../../src/domain/models'
import { AddPlanetParams } from '../../../src/domain/usecases'

export const mockPlanetModel = (): PlanetModel => ({
  id: 'any_id',
  name: 'any_name',
  terrain: 'any_terrain',
  climate: 'any_climate',
  movie_apparitions: 1
})

export const mockAddPlanetParams = (): AddPlanetParams => (
  {
    name: 'any_name',
    terrain: 'any_terrain',
    climate: 'any_climate'
  }
)
