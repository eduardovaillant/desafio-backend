import { RemovePlanetController } from '../../../src/presentation/controllers'
import { serverError, ok } from '../../../src/presentation/helpers'
import { HttpRequest } from '../../../src/presentation/protocols'
import { RemovePlanetSpy } from '../../domain/usecases'

type SutTypes = {
  sut: RemovePlanetController
  removePlanetSpy: RemovePlanetSpy
}

const makeSut = (): SutTypes => {
  const removePlanetSpy = new RemovePlanetSpy()
  const sut = new RemovePlanetController(removePlanetSpy)
  return {
    sut,
    removePlanetSpy
  }
}

describe('RemovePlanetController', () => {
  const mockRequest = (): HttpRequest => (
    {
      query: {
        id: 'any_id'
      }
    }
  )

  test('should call RemovePlanet with correct id', async () => {
    const { sut, removePlanetSpy } = makeSut()
    await sut.handle(mockRequest())
    expect(removePlanetSpy.id).toEqual('any_id')
  })

  test('should return 500 LoadPlanetByName throws', async () => {
    const { sut, removePlanetSpy } = makeSut()
    jest.spyOn(removePlanetSpy, 'remove').mockImplementationOnce(() => { throw new Error() })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('should return 200 with deleted 1 on delete success', async () => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    const result = {
      deleted: 1,
      not_deleted: 0
    }
    expect(response).toEqual(ok(result))
  })

  test('should return 200 with deleted 0 on delete fail', async () => {
    const { sut, removePlanetSpy } = makeSut()
    removePlanetSpy.removed = false
    const response = await sut.handle(mockRequest())
    const result = {
      deleted: 0,
      not_deleted: 1
    }
    expect(response).toEqual(ok(result))
  })
})
