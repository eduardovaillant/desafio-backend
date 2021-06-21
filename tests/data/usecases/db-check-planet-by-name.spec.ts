import { DbCheckPlanetByName } from '../../../src/data/usecases'
import { CheckPlanetByNameRepositorySpy } from '../mocks'

type SutTypes = {
  sut: DbCheckPlanetByName
  checkPlanetByNameRepositorySpy: CheckPlanetByNameRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkPlanetByNameRepositorySpy = new CheckPlanetByNameRepositorySpy()
  const sut = new DbCheckPlanetByName(checkPlanetByNameRepositorySpy)
  return {
    sut,
    checkPlanetByNameRepositorySpy
  }
}

describe('DbCheckPlanetByName', () => {
  test('should call CheckPlanetByNameRepository with correct value', async () => {
    const { sut, checkPlanetByNameRepositorySpy } = makeSut()
    await sut.checkByName('any_name')
    expect(checkPlanetByNameRepositorySpy.name).toBe('any_name')
  })

  test('should throw if CheckPlanetByNameRepository throws', async () => {
    const { sut, checkPlanetByNameRepositorySpy } = makeSut()
    jest.spyOn(checkPlanetByNameRepositorySpy, 'checkByName').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.checkByName('any_name')
    await expect(promise).rejects.toThrow()
  })

  test('should return true on success', async () => {
    const { sut, checkPlanetByNameRepositorySpy } = makeSut()
    checkPlanetByNameRepositorySpy.result = true
    const result = await sut.checkByName('any_name')
    expect(result).toBeTruthy()
  })
})
