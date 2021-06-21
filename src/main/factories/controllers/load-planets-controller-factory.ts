import { LoadPlanetsController } from '../../../presentation/controllers'
import { Controller } from '../../../presentation/protocols'
import { makeListPlanets, makeLoadPlanetById, makeLoadPlanetsByName } from '../usecases'

export const makeLoadPlanetByNameController = (): Controller => {
  return new LoadPlanetsController(makeLoadPlanetsByName(), makeLoadPlanetById(), makeListPlanets())
}
