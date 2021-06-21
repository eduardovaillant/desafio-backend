import { DbCheckPlanetByName } from '../../../data/usecases'
import { CheckPlanetByName } from '../../../domain/usecases'
import { MongoPlanetRepository } from '../../../infra/repositories'

export const makeCheckPlanetByName = (): CheckPlanetByName => {
  const mongoPlanetRepository = new MongoPlanetRepository()
  return new DbCheckPlanetByName(mongoPlanetRepository)
}
