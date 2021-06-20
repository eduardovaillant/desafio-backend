import { AddPlanetValidator } from '../../../src/validation/validators/add-planet-validator'
import { RequiredParamError } from '../../../src/presentation/errors'

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

  test('should return a RequiredParamError if no climate is provided', () => {
    const { sut } = makeSut()
    const result = sut.validate({
      name: 'any_name',
      terrain: 'any_terrain'
    })
    expect(result).toEqual(new RequiredParamError('climate'))
  })

  test('should return a RequiredParamError if no terrain is provided', () => {
    const { sut } = makeSut()
    const result = sut.validate({
      name: 'any_name',
      climate: 'any_climate'
    })
    expect(result).toEqual(new RequiredParamError('terrain'))
  })

  test('should return null if no Validation fails', () => {
    const { sut } = makeSut()
    const result = sut.validate({
      name: 'any_name',
      terrain: 'any_terrain',
      climate: 'any_climate'
    })
    expect(result).toBeNull()
  })
})
