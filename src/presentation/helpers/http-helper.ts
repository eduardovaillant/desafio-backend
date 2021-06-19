import { HttpResponse } from '../protocols'

export const created = (data: any): HttpResponse => (
  {
    statusCode: 201,
    body: {
      data
    }
  }
)

export const badRequest = (error: Error): HttpResponse => (
  {
    statusCode: 400,
    body: {
      error: error.name,
      detail: error.message
    }
  }
)

export const serverError = (error: Error): HttpResponse => (
  {
    statusCode: 500,
    body: error
  }
)
