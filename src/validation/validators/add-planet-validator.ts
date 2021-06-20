import { RequiredParamError } from '../../presentation/errors'
import { Validation } from '../../presentation/protocols'

export class AddPlanetValidator implements Validation {
  validate (input: any): Error {
    if (!input.name) {
      return new RequiredParamError('name')
    }

    if (!input.climate) {
      return new RequiredParamError('climate')
    }

    if (!input.terrain) {
      return new RequiredParamError('terrain')
    }

    return null
  }
}
