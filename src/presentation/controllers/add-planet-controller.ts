import { Controller, HttpRequest, HttpResponse, Validation } from '../protocols'
import { badRequest } from '../helpers'

export class AddPlanetController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(new Error())
    }
    return await Promise.resolve(null)
  }
}
