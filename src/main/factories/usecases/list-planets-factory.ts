import { DbListPlanets } from '../../../data/usecases'
import { ListPlanets } from '../../../domain/usecases'
import { MongoPlanetRepository } from '../../../infra/repositories'

export const makeListPlanets = (): ListPlanets => {
  const mongoPlanetRepository = new MongoPlanetRepository()
  return new DbListPlanets(mongoPlanetRepository)
}
