import { LoadPlanetsByNameRepository } from '../protocols'
import { LoadPlanetsByName, PaginatedResults } from '../../domain/usecases'
import env from '../../main/config/env'

export class DbLoadPlanetsByName implements LoadPlanetsByName {
  constructor (
    private readonly loadPlanetsByNameRepository: LoadPlanetsByNameRepository
  ) {}

  async loadByName (name: string, page: number = 1): Promise<PaginatedResults> {
    const result = await this.loadPlanetsByNameRepository.loadByName(name, page)
    const qtdPages: number = Math.ceil(result.count / 10) || 1
    if (page <= qtdPages && page > 0) {
      const paginatedResults = {
        count: result.count,
        next: page < qtdPages ? `${env.baseUrl}?name=${name}&page=${+page + 1}` : null,
        previous: page > 1 ? `${env.baseUrl}?name=${name}&page=${+page - 1}` : null,
        planets: result.planets
      }
      return paginatedResults
    }
    return null
  }
}
