import { MongoHelper } from '../helpers'
import { AddPlanetRepository, AddPlanetRepositoryParams, ListPlanetsRepository, LoadPlanetByIdRepository, CheckPlanetByNameRepository, RemovePlanetRepository, PlanetsModel, LoadPlanetsByNameRepository } from '../../data/protocols'
import { PlanetModel } from '../../domain/models'

import { ObjectID } from 'mongodb'
export class MongoPlanetRepository implements AddPlanetRepository, CheckPlanetByNameRepository, LoadPlanetByIdRepository, ListPlanetsRepository, RemovePlanetRepository, LoadPlanetsByNameRepository {
  private readonly nPerPage: number = 10

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

  async list (page: number): Promise<PlanetsModel> {
    const planetsCollection = await MongoHelper.getCollection('planets')
    const count = await planetsCollection.countDocuments()
    const result = await planetsCollection.find({})
      .skip(page > 0 ? ((page - 1) * this.nPerPage) : 0)
      .limit(this.nPerPage)
      .toArray()
    const planets = MongoHelper.mapCollection(result)
    return {
      count,
      planets
    }
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
