import { AddPlanetController } from '../../../src/presentation/controllers'
import { badRequest } from '../../../src/presentation/helpers'
import { HttpRequest } from '../../../src/presentation/protocols'
import { ValidationSpy } from '../mocks/validation'

const mockPlanet = (): any => (
  {
    name: 'any_name',
    climante: 'any_climate',
    terrain: 'any_terrain'
  }
)

const mockRequest = (): HttpRequest => (
  {
    body: mockPlanet()
  }
)

interface SutTypes {
  sut: AddPlanetController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new AddPlanetController(validationSpy)
  return {
    sut,
    validationSpy
  }
}

describe('AddPlanetController', () => {
  test('should call validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    await sut.handle(mockRequest())
    expect(validationSpy.input).toEqual(mockPlanet())
  })

  test('should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = true
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequest(new Error()))
  })
})
