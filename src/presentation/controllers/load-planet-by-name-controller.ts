import { PlanetModel } from 'domain/models'
import { LoadPlanetById, LoadPlanetByName } from '../../domain/usecases'
import { ok, serverError } from '../helpers'
import { Controller, HttpRequest, HttpResponse } from '../protocols'

export class LoadPlanetByNameController implements Controller {
  constructor (
    private readonly loadPlanetByName: LoadPlanetByName,
    private readonly loadPlanetById: LoadPlanetById
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      // TODO pensar em uma forma melhor para organizar isso
      const { name, id } = httpRequest.query
      let planet: PlanetModel

      if (name) {
        planet = await this.loadPlanetByName.loadByName(name)
      }

      if (id) {
        planet = await this.loadPlanetById.loadById(id)
      }

      return ok(planet)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
