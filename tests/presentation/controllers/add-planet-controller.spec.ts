import { AddPlanetController } from '../../../src/presentation/controllers'
import { badRequest, serverError } from '../../../src/presentation/helpers'
import { HttpRequest } from '../../../src/presentation/protocols'
import { AddPlanetSpy } from '../../domain/usecases/add-planet'
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
  addPlanetSpy: AddPlanetSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const addPlanetSpy = new AddPlanetSpy()
  const sut = new AddPlanetController(validationSpy, addPlanetSpy)
  return {
    sut,
    validationSpy,
    addPlanetSpy
  }
}

describe('AddPlanetController', () => {
  test('should call Validation with correct values', async () => {
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

  test('should throw if Validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('should call AddPlanet with correct values', async () => {
    const { sut, addPlanetSpy } = makeSut()
    await sut.handle(mockRequest())
    expect(addPlanetSpy.planet).toEqual(mockPlanet())
  })

  test('should throw if AddPlanet throws', async () => {
    const { sut, addPlanetSpy } = makeSut()
    jest.spyOn(addPlanetSpy, 'add').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })
})
