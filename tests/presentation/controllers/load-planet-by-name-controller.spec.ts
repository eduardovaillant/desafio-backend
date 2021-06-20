import { LoadPlanetByNameController } from '../../../src/presentation/controllers'
import { serverError, ok } from '../../../src/presentation/helpers'
import { HttpRequest } from '../../../src/presentation/protocols'
import { mockPlanetModel } from '../../domain/mocks/planet'
import { LoadPlanetByIdSpy, LoadPlanetByNameSpy } from '../../domain/usecases/load-planet-by-name'

type SutTypes = {
  sut: LoadPlanetByNameController
  loadPlanetByNameSpy: LoadPlanetByNameSpy
  loadPlanetByIdSpy: LoadPlanetByIdSpy
}

const makeSut = (): SutTypes => {
  const loadPlanetByNameSpy = new LoadPlanetByNameSpy()
  const loadPlanetByIdSpy = new LoadPlanetByIdSpy()
  const sut = new LoadPlanetByNameController(loadPlanetByNameSpy, loadPlanetByIdSpy)
  return {
    sut,
    loadPlanetByNameSpy,
    loadPlanetByIdSpy
  }
}

describe('AddPlanetController', () => {
  describe('loadPlanetByName()', () => {
    const mockRequest = (): HttpRequest => (
      {
        query: {
          name: 'any_name'
        }
      }
    )

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

  describe('loadPlanetById()', () => {
    const mockRequest = (): HttpRequest => (
      {
        query: {
          id: 'any_id'
        }
      }
    )

    test('should call LoadPlanetById with correct value', async () => {
      const { sut, loadPlanetByIdSpy } = makeSut()
      await sut.handle(mockRequest())
      expect(loadPlanetByIdSpy.id).toEqual('any_id')
    })

    test('should return 500 LoadPlanetByName throws', async () => {
      const { sut, loadPlanetByIdSpy } = makeSut()
      jest.spyOn(loadPlanetByIdSpy, 'loadById').mockImplementationOnce(() => { throw new Error() })
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(serverError(new Error()))
    })

    test('should return 200 on success', async () => {
      const { sut } = makeSut()
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(ok(mockPlanetModel()))
    })
  })
})
