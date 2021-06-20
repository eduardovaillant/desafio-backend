import { DbRemovePlanet } from '../../../data/usecases'
import { RemovePlanet } from '../../../domain/usecases'
import { MongoPlanetRepository } from '../../../infra/repositories'

export const makeRemovePlanet = (): RemovePlanet => {
  const mongoPlanetRepository = new MongoPlanetRepository()
  return new DbRemovePlanet(mongoPlanetRepository)
}
