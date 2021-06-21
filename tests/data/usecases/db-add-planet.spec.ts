import { AddPlanetRepositorySpy, CheckPlanetByNameRepositorySpy, mockAddPlanetRepositoryParams, SwapiClientSpy } from '../mocks'
import { mockAddPlanetParams, mockPlanetModel } from '../../domain/mocks'
import { DbAddPlanet } from '../../../src/data/usecases'
import { InvalidPlanetTerrainError, InvalidPlanetNameError, InvalidPlanetClimateError, PlanetAlreadyExistsError } from '../../../src/data/errors'

type SutTypes = {
  sut: DbAddPlanet
  checkPlanetByNameRepositorySpy: CheckPlanetByNameRepositorySpy
  swapiClientSpy: SwapiClientSpy
  addPlanetRepositorySpy: AddPlanetRepositorySpy
}

const makeSut = (): SutTypes => {
  const checkPlanetByNameRepositorySpy = new CheckPlanetByNameRepositorySpy()
  const swapiClientSpy = new SwapiClientSpy()
  const addPlanetRepositorySpy = new AddPlanetRepositorySpy()
  const sut = new DbAddPlanet(checkPlanetByNameRepositorySpy, swapiClientSpy, addPlanetRepositorySpy)
  return {
    sut,
    checkPlanetByNameRepositorySpy,
    swapiClientSpy,
    addPlanetRepositorySpy
  }
}

describe('DbAddPlanet', () => {
  test('should call CheckPlanetByNameRepository with correct values', async () => {
    const { sut, checkPlanetByNameRepositorySpy } = makeSut()
    await sut.add(mockAddPlanetParams())
    expect(checkPlanetByNameRepositorySpy.name).toBe(mockAddPlanetParams().name)
  })

  test('should throw a PlanetAlreadyExistsError if the planet already exists', async () => {
    const { sut, checkPlanetByNameRepositorySpy } = makeSut()
    checkPlanetByNameRepositorySpy.result = true
    const promise = sut.add(mockAddPlanetParams())
    await expect(promise).rejects.toThrow(new PlanetAlreadyExistsError())
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

  test('should throw a InvalidPlanetNameError if the name is invalid', async () => {
    const { sut, swapiClientSpy } = makeSut()
    swapiClientSpy.swapiPlanetReturn.name = 'diferent_name'
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

  test('should throw if AddPlanetRepository throws', async () => {
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
