import { Controller, HttpRequest, HttpResponse } from '../protocols'
import { ok, serverError } from '../helpers'
import { RemovePlanet } from '../../domain/usecases'

export class RemovePlanetController implements Controller {
  constructor (
    private readonly removePlanet: RemovePlanet
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const id = httpRequest.query.id

      const removed = await this.removePlanet.remove(id)

      const result = {
        deleted: 0,
        not_deleted: 1
      }

      if (removed) {
        result.deleted = 1
        result.not_deleted = 0
      }

      return ok(result)
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
