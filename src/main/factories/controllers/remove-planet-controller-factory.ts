import { RemovePlanetController } from '../../../presentation/controllers'
import { Controller } from '../../../presentation/protocols'
import { makeRemovePlanet } from '../usecases'

export const makeRemovePlanetController = (): Controller => {
  return new RemovePlanetController(makeRemovePlanet())
}
