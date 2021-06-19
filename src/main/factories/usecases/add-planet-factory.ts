import { DbAddPlanet } from '../../../data/usecases/db-add-planet'
import { AddPlanet } from '../../../domain/usecases'
import { SwapiClientImpl } from '../../../infra/clients/swapi-client'
import { MongoPlanetRepository } from '../../../infra/repositories'

export const makeAddPlanet = (): AddPlanet => {
  const mongoPlanetRepository = new MongoPlanetRepository()
  const swapiClient = new SwapiClientImpl()
  return new DbAddPlanet(mongoPlanetRepository, swapiClient, mongoPlanetRepository)
}
