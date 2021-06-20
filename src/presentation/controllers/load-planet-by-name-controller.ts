import { ListPlanets, LoadPlanetById, LoadPlanetByName } from '../../domain/usecases'
import { ok, serverError } from '../helpers'
import { Controller, HttpRequest, HttpResponse } from '../protocols'

export class LoadPlanetByNameController implements Controller {
  constructor (
    private readonly loadPlanetByName: LoadPlanetByName,
    private readonly loadPlanetById: LoadPlanetById,
    private readonly listPlanets: ListPlanets
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      // TODO pensar em uma forma melhor para organizar isso
      if (httpRequest.query) {
        const { name, id } = httpRequest.query

        if (name) {
          const planet = await this.loadPlanetByName.loadByName(name)
          return ok(planet)
        }

        if (id) {
          const planet = await this.loadPlanetById.loadById(id)
          return ok(planet)
        }
      }

      const planets = await this.listPlanets.list()

      return ok(planets)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
