import { Router } from 'express'
import { adaptRoute } from '../adapters'
import { makeAddPlanetController, makeLoadPlanetByNameController } from '../factories/controllers'

const router = Router()

// TODO integration tests
router.post('/planets', adaptRoute(makeAddPlanetController()))
router.get('/planets', adaptRoute(makeLoadPlanetByNameController()))

export default router
