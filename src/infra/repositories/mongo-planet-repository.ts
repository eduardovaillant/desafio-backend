import { MongoHelper } from '../helpers'
import { AddPlanetRepository, AddPlanetRepositoryParams, ListPlanetsRepository, LoadPlanetByIdRepository, LoadPlanetByNameRepository, RemovePlanetRepository } from '../../data/protocols'
import { PlanetModel } from '../../domain/models'

import { ObjectID } from 'mongodb'

export class MongoPlanetRepository implements AddPlanetRepository, LoadPlanetByNameRepository, LoadPlanetByIdRepository, ListPlanetsRepository, RemovePlanetRepository {
  async add (addPlanetRepositoryParams: AddPlanetRepositoryParams): Promise<PlanetModel> {
    const planetsCollection = await MongoHelper.getCollection('planets')
    const result = await planetsCollection.insertOne(addPlanetRepositoryParams)
    return MongoHelper.map(result.ops[0])
  }

  async loadByName (name: string): Promise<PlanetModel> {
    const planetsCollection = await MongoHelper.getCollection('planets')
    const result = await planetsCollection.findOne({ name })
    if (result) {
      return MongoHelper.map(result)
    }
    return null
  }

  async loadById (id: string): Promise<PlanetModel> {
    const planetsCollection = await MongoHelper.getCollection('planets')
    const result = await planetsCollection.findOne({ _id: new ObjectID(id) })
    if (result) {
      return MongoHelper.map(result)
    }
    return null
  }

  async list (): Promise<PlanetModel[]> {
    const planetsCollection = await MongoHelper.getCollection('planets')
    const result = await planetsCollection.find({}).toArray()
    if (result) {
      return MongoHelper.mapCollection(result)
    }
    return []
  }

  async remove (id: string): Promise<boolean> {
    const planetsCollection = await MongoHelper.getCollection('planets')
    const result = await planetsCollection.deleteOne({ _id: new ObjectID(id) })
    if (result.deletedCount === 1) {
      return true
    }
    return false
  }
}
