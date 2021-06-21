import { DbListPlanets } from '../../../src/data/usecases'
import env from '../../../src/main/config/env'
import { ListPlanetsRepositorySpy } from '../mocks'

type SutTypes = {
  sut: DbListPlanets
  listPlanetsRepositorySpy: ListPlanetsRepositorySpy
}

const makeSut = (): SutTypes => {
  const listPlanetsRepositorySpy = new ListPlanetsRepositorySpy()
  const sut = new DbListPlanets(listPlanetsRepositorySpy)
  return {
    sut,
    listPlanetsRepositorySpy
  }
}

describe('DbListPlanets', () => {
  test('should call ListPlanetsRepository', async () => {
    const { sut, listPlanetsRepositorySpy } = makeSut()
    const listSpy = jest.spyOn(listPlanetsRepositorySpy, 'list')
    await sut.list()
    expect(listSpy).toHaveBeenCalled()
  })

  test('should throw if ListPlanetsRepository throws', async () => {
    const { sut, listPlanetsRepositorySpy } = makeSut()
    jest.spyOn(listPlanetsRepositorySpy, 'list').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.list()
    await expect(promise).rejects.toThrow()
  })

  test('should return null if a invalid page was passed', async () => {
    const { sut } = makeSut()
    const result = await sut.list(3)
    expect(result).toBeNull()
  })

  test('should return the correct next page when possible', async () => {
    const { sut } = makeSut()
    const result = await sut.list(1)
    expect(result.next).toBe(`${env.baseUrl}?page=2`)
  })

  test('should return the correct previous page when possible', async () => {
    const { sut } = makeSut()
    const result = await sut.list(2)
    expect(result.previous).toBe(`${env.baseUrl}?page=1`)
  })

  test('should return count = 0 if there is no planets on the database', async () => {
    const { sut, listPlanetsRepositorySpy } = makeSut()
    listPlanetsRepositorySpy.planets.count = 0
    const result = await sut.list()
    expect(result.count).toBe(0)
  })

  test('should return a paginated result on success', async () => {
    const { sut } = makeSut()
    const result = await sut.list(1)
    expect(result.count).toBe(11)
  })
})
