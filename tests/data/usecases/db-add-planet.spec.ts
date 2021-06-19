import { DbAddPlanet } from '../../../src/data/usecases/db-add-planet'
import { mockAddPlanetParams, mockPlanetModel } from '../../domain/mocks/planet'
import { LoadPlanetByNameRepositorySpy } from '../mocks/repositories'
import { SwapiClientSpy } from '../mocks/swapi-client'

type SutTypes = {
  sut: DbAddPlanet
  loadPlanetByNameRepositorySpy: LoadPlanetByNameRepositorySpy
  swapiClientSpy: SwapiClientSpy
}

const makeSut = (): SutTypes => {
  const loadPlanetByNameRepositorySpy = new LoadPlanetByNameRepositorySpy()
  const swapiClientSpy = new SwapiClientSpy()
  const sut = new DbAddPlanet(loadPlanetByNameRepositorySpy, swapiClientSpy)
  return {
    sut,
    loadPlanetByNameRepositorySpy,
    swapiClientSpy
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

  test('should call SwapiClient with correct values', async () => {
    const { sut, swapiClientSpy } = makeSut()
    await sut.add(mockAddPlanetParams())
    expect(swapiClientSpy.name).toBe(mockAddPlanetParams().name)
  })
})
