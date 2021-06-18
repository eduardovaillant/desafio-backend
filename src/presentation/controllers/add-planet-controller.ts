import { Controller, HttpRequest, HttpResponse, Validation } from '../protocols'
import { badRequest, serverError } from '../helpers'
import { AddPlanet } from '../../domain/usecases/add-planet'

export class AddPlanetController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addPlanet: AddPlanet
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const planet = httpRequest.body
      const error = this.validation.validate(planet)
      if (error) {
        return badRequest(new Error())
      }
      await this.addPlanet.add(planet)
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
