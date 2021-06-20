import { LoadPlanetByNameController } from '../../../presentation/controllers'
import { Controller } from '../../../presentation/protocols'
import { makeListPlanets, makeLoadPlanetById, makeLoadPlanetByName } from '../usecases'

export const makeLoadPlanetByNameController = (): Controller => {
  return new LoadPlanetByNameController(makeLoadPlanetByName(), makeLoadPlanetById(), makeListPlanets())
}
