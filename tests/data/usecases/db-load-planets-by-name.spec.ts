import env from '../../../src/main/config/env'
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
  test('should call LoadPlanetsByNameRepository with correct values', async () => {
    const { sut, loadPlanetsByNameRepositorySpy } = makeSut()
    await sut.loadByName('any_name')
    expect(loadPlanetsByNameRepositorySpy.name).toBe('any_name')
  })

  test('should throw if LoadPlanetsByNameRepository throws', async () => {
    const { sut, loadPlanetsByNameRepositorySpy } = makeSut()
    jest.spyOn(loadPlanetsByNameRepositorySpy, 'loadByName').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.loadByName('any_name')
    await expect(promise).rejects.toThrow()
  })

  test('should return null if a invalid page was passed', async () => {
    const { sut } = makeSut()
    const result = await sut.loadByName('any_name', 3)
    expect(result).toBeNull()
  })

  test('should return the correct next page when possible', async () => {
    const { sut } = makeSut()
    const result = await sut.loadByName('any_name', 1)
    expect(result.next).toBe(`${env.baseUrl}?page=2`)
  })

  test('should return the correct previous page when possible', async () => {
    const { sut } = makeSut()
    const result = await sut.loadByName('any_name', 2)
    expect(result.previous).toBe(`${env.baseUrl}?page=1`)
  })

  test('should return count = 0 if there is no planets on the database', async () => {
    const { sut, loadPlanetsByNameRepositorySpy } = makeSut()
    loadPlanetsByNameRepositorySpy.planets.count = 0
    const result = await sut.loadByName('any_name')
    expect(result.count).toBe(0)
  })

  test('should return a paginated result on success', async () => {
    const { sut } = makeSut()
    const result = await sut.loadByName('any_name', 1)
    expect(result.count).toBeDefined()
    expect(result.planets).toBeDefined()
    expect(result.previous).toBeDefined()
    expect(result.next).toBeDefined()
  })
})
