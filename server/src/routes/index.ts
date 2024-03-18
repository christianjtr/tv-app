import { Router } from 'express';
import movieRouter from './movie.route';
import tvShowRouter from './tvshow.route';

const router = Router();

router.use('/movies', movieRouter);
router.use('/tv-shows', tvShowRouter);

export default router;
