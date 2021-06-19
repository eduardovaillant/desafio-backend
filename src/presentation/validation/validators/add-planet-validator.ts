import { RequiredParamError } from '../../errors'
import { Validation } from '../../protocols'

export class AddPlanetValidator implements Validation {
  validate (input: any): Error {
    if (!input.name) {
      return new RequiredParamError('name')
    }
  }
}
