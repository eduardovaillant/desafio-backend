import { InvalidaPlanetTerrainError, InvalidaPlanetNameError } from '../../../src/data/errors'
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

  test('should throw a InvalidPlanetNameError if SwapiClient returns null', async () => {
    const { sut, swapiClientSpy } = makeSut()
    swapiClientSpy.swapiPlanetReturn = null
    const promise = sut.add(mockAddPlanetParams())
    await expect(promise).rejects.toThrow(new InvalidaPlanetNameError())
  })

  test('should throw a InvalidPlanetTerrainError if the terrain is invalid', async () => {
    const { sut, swapiClientSpy } = makeSut()
    swapiClientSpy.swapiPlanetReturn.terrain = 'diferent_terrain'
    const promise = sut.add(mockAddPlanetParams())
    await expect(promise).rejects.toThrow(new InvalidaPlanetTerrainError())
  })
})
