export type SwapiPlanetReturn = {
  name: string
  climate: string
  terrain: string
  movie_apparitions: number
}

export interface SwapiClient {
  search: (name: string) => Promise<SwapiPlanetReturn>
}
