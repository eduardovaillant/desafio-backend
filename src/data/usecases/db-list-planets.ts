import { ListPlanetsRepository } from '../protocols'
import { ListPlanets, PaginatedResults } from '../../domain/usecases'
import env from '../../main/config/env'

export class DbListPlanets implements ListPlanets {
  constructor (
    private readonly listPlanetsRepository: ListPlanetsRepository
  ) {}

  async list (page: number = 1): Promise<PaginatedResults> {
    const result = await this.listPlanetsRepository.list(page)
    const qtdPages: number = Math.ceil(result.count / 10) || 1
    if (page <= qtdPages && page > 0) {
      const paginatedResults = {
        count: result.count,
        next: page < qtdPages ? `${env.baseUrl}?page=${+page + 1}` : null,
        previous: page > 1 ? `${env.baseUrl}?page=${+page - 1}` : null,
        planets: result.planets
      }
      return paginatedResults
    }
    return null
  }
}
