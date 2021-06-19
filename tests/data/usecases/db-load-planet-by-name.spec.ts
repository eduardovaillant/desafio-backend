import { DbLoadPlanetByName } from '../../../src/data/usecases'
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
})
