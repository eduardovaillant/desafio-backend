import { DbLoadPlanetById } from '../../../src/data/usecases'
import { mockPlanetModel } from '../../domain/mocks/planet'
import { LoadPlanetByIdRepositorySpy } from '../mocks/repositories'

type SutTypes = {
  sut: DbLoadPlanetById
  loadPlanetByIdRepositorySpy: LoadPlanetByIdRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadPlanetByIdRepositorySpy = new LoadPlanetByIdRepositorySpy()
  const sut = new DbLoadPlanetById(loadPlanetByIdRepositorySpy)
  return {
    sut,
    loadPlanetByIdRepositorySpy
  }
}

describe('DbLoadPlanetByName', () => {
  test('should call LoadPlanetByIdRepository with correct value', async () => {
    const { sut, loadPlanetByIdRepositorySpy } = makeSut()
    await sut.loadById('any_id')
    expect(loadPlanetByIdRepositorySpy.id).toBe('any_id')
  })

  test('should throw if LoadPlanetByIdRepository throws', async () => {
    const { sut, loadPlanetByIdRepositorySpy } = makeSut()
    jest.spyOn(loadPlanetByIdRepositorySpy, 'loadById').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.loadById('any_name')
    await expect(promise).rejects.toThrow()
  })

  test('should return the LoadPlanetByIdRepository result on success', async () => {
    const { sut, loadPlanetByIdRepositorySpy } = makeSut()
    loadPlanetByIdRepositorySpy.planet = mockPlanetModel()
    const result = await sut.loadById('any_name')
    expect(result).toEqual(mockPlanetModel())
  })
})
