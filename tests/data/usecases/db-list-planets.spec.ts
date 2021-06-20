import { DbListPlanets } from '../../../src/data/usecases'
import { ListPlanetsRepositorySpy } from '../mocks/repositories'

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

  test('should return the as list of planets on success', async () => {
    const { sut } = makeSut()
    const result = await sut.list()
    expect(result.length).toBe(2)
  })
})
