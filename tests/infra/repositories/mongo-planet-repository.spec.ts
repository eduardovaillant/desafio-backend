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

  describe('loadByName()', () => {
    test('should return the planet if the planet exists in the database', async () => {
      await planetCollection.insertOne(mockAddPlanetRepositoryParams())
      const sut = makeSut()
      const planet = await sut.loadByName('any_name')
      expect(planet.id).toBeTruthy()
      expect(planet.name).toBe('any_name')
    })

    test('should return null if the planet does not exists in the database', async () => {
      const sut = makeSut()
      const planet = await sut.loadByName('any_name')
      expect(planet).toBeNull()
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

  describe('list()', () => {
    test('should return a list of planets on success', async () => {
      await planetCollection.insertOne(mockAddPlanetRepositoryParams())
      await planetCollection.insertOne(mockAddPlanetRepositoryParams())
      const sut = makeSut()
      const planets = await sut.list()
      expect(planets.length).toBe(2)
    })

    test('should return an empty list if there is no planets on the database', async () => {
      const sut = makeSut()
      const planet = await sut.list()
      expect(planet).toEqual([])
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
