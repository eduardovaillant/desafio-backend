import { DbLoadPlanetsByName } from '../../../data/usecases'
import { LoadPlanetsByName } from '../../../domain/usecases'
import { MongoPlanetRepository } from '../../../infra/repositories'

export const makeLoadPlanetsByName = (): LoadPlanetsByName => {
  const mongoPlanetRepository = new MongoPlanetRepository()
  return new DbLoadPlanetsByName(mongoPlanetRepository)
}
