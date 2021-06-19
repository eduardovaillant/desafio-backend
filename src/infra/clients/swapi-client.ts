import { SwapiClient, SwapiPlanetReturn } from '../../data/protocols/swapi-client'
import axios from 'axios'

export class SwapiClientImpl implements SwapiClient {
  async search (name: string): Promise<SwapiPlanetReturn> {
    const url = `https://swapi.dev/api/planets/?search=${name}`

    const response = await axios.get(url)

    if (response.data.results.length === 0) {
      return null
    }

    const swapiPlanetReturn: SwapiPlanetReturn = {
      name: response.data.results[0].name,
      climate: response.data.results[0].climate,
      terrain: response.data.results[0].terrain,
      movie_apparitions: response.data.results[0].films.length
    }

    return swapiPlanetReturn
  }
}
