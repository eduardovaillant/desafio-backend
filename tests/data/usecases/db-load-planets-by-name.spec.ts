import { DbLoadPlanetsByName } from '../../../src/data/usecases'
import { LoadPlanetsByNameRepositorySpy } from '../mocks'

type SutTypes = {
  sut: DbLoadPlanetsByName
  loadPlanetsByNameRepositorySpy: LoadPlanetsByNameRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadPlanetsByNameRepositorySpy = new LoadPlanetsByNameRepositorySpy()
  const sut = new DbLoadPlanetsByName(loadPlanetsByNameRepositorySpy)
  return {
    sut,
    loadPlanetsByNameRepositorySpy
  }
}

describe('DbloadPlanetsByName', () => {
  test('should call LoadPlanetsByNameRepository', async () => {
    const { sut, loadPlanetsByNameRepositorySpy } = makeSut()
    const loadByNameSpy = jest.spyOn(loadPlanetsByNameRepositorySpy, 'loadByName')
    await sut.loadByName('any_name')
    expect(loadByNameSpy).toHaveBeenCalled()
  })

  test('should throw if LoadPlanetsByNameRepository throws', async () => {
    const { sut, loadPlanetsByNameRepositorySpy } = makeSut()
    jest.spyOn(loadPlanetsByNameRepositorySpy, 'loadByName').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.loadByName('any_name')
    await expect(promise).rejects.toThrow()
  })

  test('should return a list of planets on success', async () => {
    const { sut } = makeSut()
    const result = await sut.loadByName('any_name')
    expect(result.length).toBe(2)
  })
})
