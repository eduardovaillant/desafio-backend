import { LoadPlanetsController } from '../../../src/presentation/controllers'
import { serverError, ok, notFound } from '../../../src/presentation/helpers'
import { HttpRequest } from '../../../src/presentation/protocols'
import { mockPlanetModel } from '../../domain/mocks/planet'
import { ListPlanetsSpy, LoadPlanetByIdSpy, LoadPlanetsByNameSpy } from '../../domain/usecases'

type SutTypes = {
  sut: LoadPlanetsController
  loadPlanetsByNameSpy: LoadPlanetsByNameSpy
  loadPlanetByIdSpy: LoadPlanetByIdSpy
  listPlanets: ListPlanetsSpy
}

const makeSut = (): SutTypes => {
  const loadPlanetsByNameSpy = new LoadPlanetsByNameSpy()
  const loadPlanetByIdSpy = new LoadPlanetByIdSpy()
  const listPlanets = new ListPlanetsSpy()
  const sut = new LoadPlanetsController(loadPlanetsByNameSpy, loadPlanetByIdSpy, listPlanets)
  return {
    sut,
    loadPlanetsByNameSpy,
    loadPlanetByIdSpy,
    listPlanets
  }
}

describe('LoadPlanetsController', () => {
  describe('loadPlanetsByName()', () => {
    const mockRequest = (): HttpRequest => (
      {
        query: {
          name: 'any_name'
        }
      }
    )

    test('should call LoadPlanetsByName with correct value', async () => {
      const { sut, loadPlanetsByNameSpy } = makeSut()
      await sut.handle(mockRequest())
      expect(loadPlanetsByNameSpy.name).toEqual('any_name')
    })

    test('should return 500 LoadPlanetsByName throws', async () => {
      const { sut, loadPlanetsByNameSpy } = makeSut()
      jest.spyOn(loadPlanetsByNameSpy, 'loadByName').mockImplementationOnce(() => { throw new Error() })
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(serverError(new Error()))
    })

    test('should return 404 if the page does not exists', async () => {
      const { sut, loadPlanetsByNameSpy } = makeSut()
      loadPlanetsByNameSpy.paginatedResults = null
      const response = await sut.handle({ query: { page: 2, name: 'any_name' } })
      expect(response).toEqual(notFound())
    })

    test('should return 200 on success', async () => {
      const { sut, loadPlanetsByNameSpy } = makeSut()
      const response = await sut.handle(mockRequest())
      expect(response).toEqual(ok(loadPlanetsByNameSpy.paginatedResults))
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
    test('should call ListPlanets if no page was passed', async () => {
      const { sut, listPlanets } = makeSut()
      await sut.handle({ })
      expect(listPlanets.page).toBe(1)
    })

    test('should call ListPlanets with the page number if page was passed', async () => {
      const { sut, listPlanets } = makeSut()
      await sut.handle({ query: { page: 2 } })
      expect(listPlanets.page).toBe(2)
    })

    test('should return 500 ListPlanets throws', async () => {
      const { sut, listPlanets } = makeSut()
      jest.spyOn(listPlanets, 'list').mockImplementationOnce(() => { throw new Error() })
      const response = await sut.handle({})
      expect(response).toEqual(serverError(new Error()))
    })

    test('should return 404 if the page does not exists', async () => {
      const { sut, listPlanets } = makeSut()
      listPlanets.paginatedResults = null
      const response = await sut.handle({})
      expect(response).toEqual(notFound())
    })

    test('should return 200 on success', async () => {
      const { sut, listPlanets } = makeSut()
      const response = await sut.handle({})
      expect(response).toEqual(ok(listPlanets.paginatedResults))
    })
  })
})
