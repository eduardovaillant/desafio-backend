import { DbRemovePlanet } from '../../../src/data/usecases'
import { RemovePlanetRepositorySpy } from '../mocks/repositories'

type SutTypes = {
  sut: DbRemovePlanet
  removePlanetRepositorySpy: RemovePlanetRepositorySpy
}

const makeSut = (): SutTypes => {
  const removePlanetRepositorySpy = new RemovePlanetRepositorySpy()
  const sut = new DbRemovePlanet(removePlanetRepositorySpy)
  return {
    sut,
    removePlanetRepositorySpy
  }
}

describe('DbRemovePlanet', () => {
  test('should call RemovePlanetRepository with correct id', async () => {
    const { sut, removePlanetRepositorySpy } = makeSut()
    await sut.remove('any_id')
    expect(removePlanetRepositorySpy.id).toBe('any_id')
  })

  test('should throw if RemovePlanetRepository throws', async () => {
    const { sut, removePlanetRepositorySpy } = makeSut()
    jest.spyOn(removePlanetRepositorySpy, 'remove').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.remove('any_id')
    await expect(promise).rejects.toThrow()
  })

  test('should return true on delete success', async () => {
    const { sut } = makeSut()
    const result = await sut.remove('any_id')
    expect(result).toBeTruthy()
  })
})
