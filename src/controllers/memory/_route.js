import { Router } from "express";
import { list, create, update, search, uploadPhoto } from "./memory.js";
const router = Router();

router.get('/:id', list);
router.post('/create', create);
router.put('/update/:id', update);
router.get('/search/:id', search);
router.post('/uploadPhoto', uploadPhoto);


export default router;