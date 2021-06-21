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
        const { name, id } = httpRequest.query

        if (name) {
          const planets = await this.LoadPlanetsByName.loadByName(name)
          return ok(planets)
        }

        if (id) {
          const planet = await this.loadPlanetById.loadById(id)
          return ok(planet)
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
