import { courseCreate, courseUpdate,courseDelete, courseGet } from "../controller/course.controller.js";
import authentication from "../middleware/authentication.middleware.js";
import authorization from "../middleware/authorization.middleware.js";
import express from 'express';

const router = express.Router();

router.post('/create', authentication, authorization,courseCreate);
router.put('/update/:id', courseUpdate);
router.delete('/delete/:id', courseDelete);
router.get('/get',courseGet);

export default router;