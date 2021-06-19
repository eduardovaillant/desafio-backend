import { RequiredParamError } from '../../../src/presentation/errors'
import { AddPlanetValidator } from '../../../src/presentation/validation/validators/add-planet-validator'

type SutTypes = {
  sut: AddPlanetValidator
}

const makeSut = (): SutTypes => {
  const sut = new AddPlanetValidator()
  return {
    sut
  }
}

describe('AddPlanetValidator', () => {
  test('should return a RequiredParamError if no name is provided', () => {
    const { sut } = makeSut()
    const result = sut.validate({
      climate: 'any_climate',
      terrain: 'any_terrain'
    })
    expect(result).toEqual(new RequiredParamError('name'))
  })
})
