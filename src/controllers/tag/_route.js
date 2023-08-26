import { Router } from "express";
import { create, search } from "./tag.js";
const router = Router();

router.post('/create', create);
router.get('/search', search);

export default router;