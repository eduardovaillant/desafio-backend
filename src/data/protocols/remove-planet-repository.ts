export interface RemovePlanetRepository {
  remove: (id: string) => Promise<boolean>
}
