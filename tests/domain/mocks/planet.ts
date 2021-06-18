import { PlanetModel } from '../../../src/domain/models'

export const mockPlanetModel = (): PlanetModel => ({
  id: 'any_id',
  name: 'any_name',
  terrain: 'any_terrain',
  climate: 'any_climate',
  movie_apparitions: 1
})
