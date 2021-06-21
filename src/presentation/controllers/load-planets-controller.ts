import { Controller, HttpRequest, HttpResponse } from '../protocols'
import { notFound, ok, serverError } from '../helpers'
import { ListPlanets, LoadPlanetById, LoadPlanetsByName } from '../../domain/usecases'

export class LoadPlanetsController implements Controller {
  constructor (
    private readonly LoadPlanetsByName: LoadPlanetsByName,
    private readonly loadPlanetById: LoadPlanetById,
    private readonly listPlanets: ListPlanets
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (httpRequest.query) {
        const { name, id, page } = httpRequest.query

        if (name) {
          const result = await this.LoadPlanetsByName.loadByName(name, page ? parseInt(page) : 1)
          if (result) {
            return ok(result)
          }
          return notFound()
        }

        if (id) {
          const result = await this.loadPlanetById.loadById(id)
          return ok(result)
        }
      }

      const result = await this.listPlanets.list(httpRequest.query ? httpRequest.query.page : 1)
      if (result) {
        return ok(result)
      }
      return notFound()
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
