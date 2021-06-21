import { MongoHelper } from '../../../src/infra/helpers'
import { MongoPlanetRepository } from '../../../src/infra/repositories'
import { mockAddPlanetRepositoryParams } from '../../data/mocks/repositories'

import { Collection } from 'mongodb'

let planetCollection: Collection

const makeSut = (): MongoPlanetRepository => {
  return new MongoPlanetRepository()
}

describe('MongoPlanetRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    planetCollection = await MongoHelper.getCollection('planets')
    await planetCollection.deleteMany({})
  })

  describe('add()', () => {
    test('should return the created planet on success ', async () => {
      const sut = makeSut()
      const addPlanetRepositoryParams = mockAddPlanetRepositoryParams()
      const planet = await sut.add(addPlanetRepositoryParams)
      expect(planet.id).toBeTruthy()
      expect(planet.name).toBe('any_name')
    })
  })

  describe('checkByName()', () => {
    test('should return true if the planet exists in the database', async () => {
      await planetCollection.insertOne(mockAddPlanetRepositoryParams())
      const sut = makeSut()
      const result = await sut.checkByName('any_name')
      expect(result).toBeTruthy()
    })

    test('should return false if the planet does not exists in the database', async () => {
      const sut = makeSut()
      const result = await sut.checkByName('any_name')
      expect(result).toBeFalsy()
    })
  })

  describe('loadById()', () => {
    test('should return the planet if the planet exists in the database', async () => {
      const createdPlanet = await planetCollection.insertOne(mockAddPlanetRepositoryParams())
      const sut = makeSut()
      const planet = await sut.loadById(createdPlanet.ops[0]._id)
      expect(planet.id).toBeTruthy()
      expect(planet.name).toBe('any_name')
    })

    test('should return null if the planet does not exists in the database', async () => {
      const sut = makeSut()
      const planet = await sut.loadById('60cf8952bc34198556cdd426')
      expect(planet).toBeNull()
    })
  })

  describe('loadByName()', () => {
    test('should return a list of planets on success', async () => {
      await planetCollection.insertOne(mockAddPlanetRepositoryParams())
      await planetCollection.insertOne(mockAddPlanetRepositoryParams())
      const sut = makeSut()
      const planets = await sut.loadByName('any_name')
      expect(planets.length).toBe(2)
    })

    test('should return an empty list if there is no planets on the database', async () => {
      const sut = makeSut()
      const planet = await sut.loadByName('any_name')
      expect(planet).toEqual([])
    })
  })

  describe('list()', () => {
    test('should return a list of planets on success', async () => {
      await planetCollection.insertOne(mockAddPlanetRepositoryParams())
      await planetCollection.insertOne(mockAddPlanetRepositoryParams())
      const sut = makeSut()
      const result = await sut.list(1)
      expect(result.count).toBe(2)
      expect(result.planets.length).toBe(2)
    })

    test('should return an empty list if there is no planets on the database', async () => {
      const sut = makeSut()
      const result = await sut.list(1)
      expect(result.count).toBe(0)
    })
  })

  describe('remove()', () => {
    test('should return true if the planet was deleted', async () => {
      const createdPlanet = await planetCollection.insertOne(mockAddPlanetRepositoryParams())
      const sut = makeSut()
      const removed = await sut.remove(createdPlanet.ops[0]._id)
      expect(removed).toBeTruthy()
    })

    test('should return false if the no planet was deleted', async () => {
      const sut = makeSut()
      const removed = await sut.remove('60cf8952bc34198556cdd426')
      expect(removed).toBeFalsy()
    })
  })
})
