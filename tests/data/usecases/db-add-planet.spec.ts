import { InvalidPlanetTerrainError, InvalidPlanetNameError, InvalidPlanetClimateError } from '../../../src/data/errors'
import { DbAddPlanet } from '../../../src/data/usecases/db-add-planet'
import { mockAddPlanetParams, mockPlanetModel } from '../../domain/mocks/planet'
import { AddPlanetRepositorySpy, LoadPlanetByNameRepositorySpy, mockAddPlanetRepositoryParams } from '../mocks/repositories'
import { SwapiClientSpy } from '../mocks/swapi-client'

type SutTypes = {
  sut: DbAddPlanet
  loadPlanetByNameRepositorySpy: LoadPlanetByNameRepositorySpy
  swapiClientSpy: SwapiClientSpy
  addPlanetRepositorySpy: AddPlanetRepositorySpy
}

const makeSut = (): SutTypes => {
  const loadPlanetByNameRepositorySpy = new LoadPlanetByNameRepositorySpy()
  const swapiClientSpy = new SwapiClientSpy()
  const addPlanetRepositorySpy = new AddPlanetRepositorySpy()
  const sut = new DbAddPlanet(loadPlanetByNameRepositorySpy, swapiClientSpy, addPlanetRepositorySpy)
  return {
    sut,
    loadPlanetByNameRepositorySpy,
    swapiClientSpy,
    addPlanetRepositorySpy
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
    await expect(promise).rejects.toThrow(new InvalidPlanetNameError())
  })

  test('should throw a InvalidPlanetTerrainError if the terrain is invalid', async () => {
    const { sut, swapiClientSpy } = makeSut()
    swapiClientSpy.swapiPlanetReturn.terrain = 'diferent_terrain'
    const promise = sut.add(mockAddPlanetParams())
    await expect(promise).rejects.toThrow(new InvalidPlanetTerrainError())
  })

  test('should throw a InvalidPlanetClimateError if the climate is invalid', async () => {
    const { sut, swapiClientSpy } = makeSut()
    swapiClientSpy.swapiPlanetReturn.climate = 'diferent_climate'
    const promise = sut.add(mockAddPlanetParams())
    await expect(promise).rejects.toThrow(new InvalidPlanetClimateError())
  })

  test('should call AddPlanetRepository with correct values', async () => {
    const { sut, addPlanetRepositorySpy } = makeSut()
    await sut.add(mockAddPlanetParams())
    expect(addPlanetRepositorySpy.addPlanetRepositoryParams).toEqual(mockAddPlanetRepositoryParams())
  })

  test('should call throw if AddPlanetRepository throws', async () => {
    const { sut, addPlanetRepositorySpy } = makeSut()
    jest.spyOn(addPlanetRepositorySpy, 'add').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.add(mockAddPlanetParams())
    await expect(promise).rejects.toThrow()
  })

  test('should return the created planet on success', async () => {
    const { sut } = makeSut()
    const result = await sut.add(mockAddPlanetParams())
    expect(result).toEqual(mockPlanetModel())
  })
})
