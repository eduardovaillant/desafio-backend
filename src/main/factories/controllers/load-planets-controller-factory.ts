import { LoadPlanetsController } from '../../../presentation/controllers'
import { Controller } from '../../../presentation/protocols'
import { makeListPlanets, makeLoadPlanetById, makeLoadPlanetByName } from '../usecases'

export const makeLoadPlanetByNameController = (): Controller => {
  return new LoadPlanetsController(makeLoadPlanetByName(), makeLoadPlanetById(), makeListPlanets())
}
