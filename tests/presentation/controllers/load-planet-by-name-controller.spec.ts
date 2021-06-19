import { LoadPlanetByNameController } from '../../../src/presentation/controllers'
import { serverError, ok } from '../../../src/presentation/helpers'
import { HttpRequest } from '../../../src/presentation/protocols'
import { mockPlanetModel } from '../../domain/mocks/planet'
import { LoadPlanetByNameSpy } from '../../domain/usecases/load-planet-by-name'

const mockRequest = (): HttpRequest => (
  {
    params: {
      name: 'any_name'
    }
  }
)

type SutTypes = {
  sut: LoadPlanetByNameController
  loadPlanetByNameSpy: LoadPlanetByNameSpy
}

const makeSut = (): SutTypes => {
  const loadPlanetByNameSpy = new LoadPlanetByNameSpy()
  const sut = new LoadPlanetByNameController(loadPlanetByNameSpy)
  return {
    sut,
    loadPlanetByNameSpy
  }
}

describe('AddPlanetController', () => {
  test('should call LoadPlanetByName with correct value', async () => {
    const { sut, loadPlanetByNameSpy } = makeSut()
    await sut.handle(mockRequest())
    expect(loadPlanetByNameSpy.name).toEqual('any_name')
  })

  test('should return 500 LoadPlanetByName throws', async () => {
    const { sut, loadPlanetByNameSpy } = makeSut()
    jest.spyOn(loadPlanetByNameSpy, 'loadByName').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(ok(mockPlanetModel()))
  })
})
