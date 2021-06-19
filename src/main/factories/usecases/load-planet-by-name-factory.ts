import { DbLoadPlanetByName } from '../../../data/usecases'
import { LoadPlanetByName } from '../../../domain/usecases'
import { MongoPlanetRepository } from '../../../infra/repositories'

export const makeLoadPlanetByName = (): LoadPlanetByName => {
  const mongoPlanetRepository = new MongoPlanetRepository()
  return new DbLoadPlanetByName(mongoPlanetRepository)
}
