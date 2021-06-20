import { LoadPlanetsController } from '../../../src/presentation/controllers'
import { serverError, ok } from '../../../src/presentation/helpers'
import { HttpRequest } from '../../../src/presentation/protocols'
import { mockPlanetModel } from '../../domain/mocks/planet'
import { ListPlanetsSpy, LoadPlanetByIdSpy, LoadPlanetByNameSpy } from '../../domain/usecases'

type SutTypes = {
  sut: LoadPlanetsController
  loadPlanetByNameSpy: LoadPlanetByNameSpy
  loadPlanetByIdSpy: LoadPlanetByIdSpy
  listPlanets: ListPlanetsSpy
}

const makeSut = (): SutTypes => {
  const loadPlanetByNameSpy = new LoadPlanetByNameSpy()
  const loadPlanetByIdSpy = new LoadPlanetByIdSpy()
  const listPlanets = new ListPlanetsSpy()
  const sut = new LoadPlanetsController(loadPlanetByNameSpy, loadPlanetByIdSpy, listPlanets)
  return {
    sut,
    loadPlanetByNameSpy,
    loadPlanetByIdSpy,
    listPlanets
  }
}

describe('LoadPlanetsController', () => {
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

  describe('listPlanets()', () => {
    test('should call ListPlanets', async () => {
      const { sut, listPlanets } = makeSut()
      const listSpy = jest.spyOn(listPlanets, 'list')
      await sut.handle({})
      expect(listSpy).toHaveBeenCalled()
    })

    test('should return 500 ListPlanets throws', async () => {
      const { sut, listPlanets } = makeSut()
      jest.spyOn(listPlanets, 'list').mockImplementationOnce(() => { throw new Error() })
      const response = await sut.handle({})
      expect(response).toEqual(serverError(new Error()))
    })

    test('should return 200 on success', async () => {
      const { sut } = makeSut()
      const response = await sut.handle({})
      expect(response).toEqual(ok([mockPlanetModel(), mockPlanetModel()]))
    })
  })
})
