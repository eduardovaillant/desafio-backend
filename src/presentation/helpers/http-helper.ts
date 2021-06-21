import { HttpResponse } from '../protocols'

export const ok = (data: any): HttpResponse => (
  {
    statusCode: 200,
    body: {
      data
    }
  }
)

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

export const notFound = (): HttpResponse => (
  {
    statusCode: 404,
    body: {
      detail: 'Not found'
    }
  }
)

export const forbidden = (error: Error): HttpResponse => (
  {
    statusCode: 403,
    body: {
      error: error.name,
      detail: error.message
    }
  }
)

export const serverError = (error: Error): HttpResponse => (
  {
    statusCode: 500,
    body: {
      error: 'InternalServerError',
      detail: error.message
    }
  }
)
