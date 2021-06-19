import { DbAddPlanet } from '../../../src/presentation/data/usecases/db-add-planet'
import { mockAddPlanetParams, mockPlanetModel } from '../../domain/mocks/planet'
import { LoadPlanetByNameRepositorySpy } from '../mocks/repositories'

type SutTypes = {
  sut: DbAddPlanet
  loadPlanetByNameRepositorySpy: LoadPlanetByNameRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadPlanetByNameRepositorySpy = new LoadPlanetByNameRepositorySpy()
  const sut = new DbAddPlanet(loadPlanetByNameRepositorySpy)
  return {
    sut,
    loadPlanetByNameRepositorySpy
  }
}

describe('DbAddPlanet', () => {
  test('should call LoadPlanetByNameRepository with correct values', async () => {
    const { sut, loadPlanetByNameRepositorySpy } = makeSut()
    await sut.add(mockAddPlanetParams())
    expect(loadPlanetByNameRepositorySpy.name).toBe(mockAddPlanetParams().name)
  })

  test('should return null if the planet already exists', async () => {
    const { sut, loadPlanetByNameRepositorySpy } = makeSut()
    loadPlanetByNameRepositorySpy.planet = mockPlanetModel()
    const result = await sut.add(mockAddPlanetParams())
    expect(result).toBeNull()
  })
})
