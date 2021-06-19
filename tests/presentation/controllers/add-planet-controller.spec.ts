import { AddPlanetController } from '../../../src/presentation/controllers'
import { badRequest, serverError, created, forbidden } from '../../../src/presentation/helpers'
import { HttpRequest } from '../../../src/presentation/protocols'
import { mockAddPlanetParams, mockPlanetModel } from '../../domain/mocks/planet'
import { AddPlanetSpy } from '../../domain/usecases/add-planet'
import { ValidationSpy } from '../mocks/validation'

const mockRequest = (): HttpRequest => (
  {
    body: mockAddPlanetParams()
  }
)

type SutTypes = {
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
    expect(validationSpy.input).toEqual(mockAddPlanetParams())
  })

  test('should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.result = new Error()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(badRequest(new Error()))
  })

  test('should return 500 if Validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('should call AddPlanet with correct values', async () => {
    const { sut, addPlanetSpy } = makeSut()
    await sut.handle(mockRequest())
    expect(addPlanetSpy.addPlanetParams).toEqual(mockAddPlanetParams())
  })

  test('should return 500 AddPlanet throws', async () => {
    const { sut, addPlanetSpy } = makeSut()
    jest.spyOn(addPlanetSpy, 'add').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('should return 403 if AddPlanet throws a InvalidPlanetDataError', async () => {
    const { sut, addPlanetSpy } = makeSut()
    const error = new Error()
    error.name = 'InvalidPlanetDataError'
    jest.spyOn(addPlanetSpy, 'add').mockImplementationOnce(() => { throw error })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(forbidden(error))
  })

  test('should return 403 if AddPlanet throws a PlanetAlreadyExistsError', async () => {
    const { sut, addPlanetSpy } = makeSut()
    const error = new Error()
    error.name = 'PlanetAlreadyExistsError'
    jest.spyOn(addPlanetSpy, 'add').mockImplementationOnce(() => { throw error })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(forbidden(error))
  })

  test('should return 201 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(created(mockPlanetModel()))
  })
})
