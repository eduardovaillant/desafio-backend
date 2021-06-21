import { MongoHelper } from '../helpers'
import { AddPlanetRepository, AddPlanetRepositoryParams, ListPlanetsRepository, LoadPlanetByIdRepository, CheckPlanetByNameRepository, RemovePlanetRepository } from '../../data/protocols'
import { PlanetModel } from '../../domain/models'

import { ObjectID } from 'mongodb'
import { LoadPlanetsByNameRepository } from 'data/protocols/load-planets-by-name-repository'
export class MongoPlanetRepository implements AddPlanetRepository, CheckPlanetByNameRepository, LoadPlanetByIdRepository, ListPlanetsRepository, RemovePlanetRepository, LoadPlanetsByNameRepository {
  async add (addPlanetRepositoryParams: AddPlanetRepositoryParams): Promise<PlanetModel> {
    const planetsCollection = await MongoHelper.getCollection('planets')
    const result = await planetsCollection.insertOne(addPlanetRepositoryParams)
    return MongoHelper.map(result.ops[0])
  }

  async checkByName (name: string): Promise<boolean> {
    const planetsCollection = await MongoHelper.getCollection('planets')
    const result = await planetsCollection.findOne({ name })
    return result !== null
  }

  async loadById (id: string): Promise<PlanetModel> {
    const planetsCollection = await MongoHelper.getCollection('planets')
    const result = await planetsCollection.findOne({ _id: new ObjectID(id) })
    if (result) {
      return MongoHelper.map(result)
    }
    return null
  }

  async loadByName (name: string): Promise<PlanetModel[]> {
    const planetsCollection = await MongoHelper.getCollection('planets')
    const result = await planetsCollection.find({ name: { $regex: name, $options: 'i' } }).toArray()
    return MongoHelper.mapCollection(result)
  }

  async list (): Promise<PlanetModel[]> {
    const planetsCollection = await MongoHelper.getCollection('planets')
    const result = await planetsCollection.find({}).toArray()
    return MongoHelper.mapCollection(result)
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
