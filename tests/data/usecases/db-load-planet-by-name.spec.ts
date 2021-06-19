import { DbLoadPlanetByName } from '../../../src/data/usecases'
import { mockPlanetModel } from '../../domain/mocks/planet'
import { LoadPlanetByNameRepositorySpy } from '../mocks/repositories'

type SutTypes = {
  sut: DbLoadPlanetByName
  loadPlanetByNameRepositorySpy: LoadPlanetByNameRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadPlanetByNameRepositorySpy = new LoadPlanetByNameRepositorySpy()
  const sut = new DbLoadPlanetByName(loadPlanetByNameRepositorySpy)
  return {
    sut,
    loadPlanetByNameRepositorySpy
  }
}

describe('DbLoadPlanetByName', () => {
  test('should call LoadPlanetByNameRepository with correct value', async () => {
    const { sut, loadPlanetByNameRepositorySpy } = makeSut()
    await sut.loadByName('any_name')
    expect(loadPlanetByNameRepositorySpy.name).toBe('any_name')
  })

  test('should throw if LoadPlanetByNameRepository throws', async () => {
    const { sut, loadPlanetByNameRepositorySpy } = makeSut()
    jest.spyOn(loadPlanetByNameRepositorySpy, 'loadByName').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.loadByName('any_name')
    await expect(promise).rejects.toThrow()
  })

  test('should return the LoadPlanetByNameRepository result on success', async () => {
    const { sut, loadPlanetByNameRepositorySpy } = makeSut()
    loadPlanetByNameRepositorySpy.planet = mockPlanetModel()
    const result = await sut.loadByName('any_name')
    expect(result).toEqual(mockPlanetModel())
  })
})
