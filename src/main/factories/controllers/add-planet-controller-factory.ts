import { AddPlanetController } from '../../../presentation/controllers'
import { Controller } from '../../../presentation/protocols'
import { AddPlanetValidator } from '../../../presentation/validation/validators/add-planet-validator'
import { makeAddPlanet } from '../usecases/add-planet-factory'

export const makeAddPlanetController = (): Controller => {
  const validation = new AddPlanetValidator()
  return new AddPlanetController(validation, makeAddPlanet())
}
