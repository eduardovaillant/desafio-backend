import { DbLoadPlanetById } from '../../../data/usecases'
import { LoadPlanetById } from '../../../domain/usecases'
import { MongoPlanetRepository } from '../../../infra/repositories'

export const makeLoadPlanetById = (): LoadPlanetById => {
  const mongoPlanetRepository = new MongoPlanetRepository()
  return new DbLoadPlanetById(mongoPlanetRepository)
}
