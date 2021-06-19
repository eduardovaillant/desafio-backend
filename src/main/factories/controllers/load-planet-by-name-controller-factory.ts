import { LoadPlanetByNameController } from '../../../presentation/controllers'
import { Controller } from '../../../presentation/protocols'
import { makeLoadPlanetByName } from '../usecases'

export const makeLoadPlanetByNameController = (): Controller => {
  return new LoadPlanetByNameController(makeLoadPlanetByName())
}
