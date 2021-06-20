import { adaptRoute } from '../adapters'
import { makeAddPlanetController, makeLoadPlanetByNameController, makeRemovePlanetController } from '../factories/controllers'

import { Router } from 'express'

const router = Router()

// TODO integration tests
router.post('/planets', adaptRoute(makeAddPlanetController()))
router.get('/planets', adaptRoute(makeLoadPlanetByNameController()))
router.delete('/planets', adaptRoute(makeRemovePlanetController()))

export default router
