import { Router } from 'express';
import { query, param } from 'express-validator';
import * as MovieController from '@controllers/movie.controller';

const router = Router();

router.get('/search', query('query').notEmpty().escape(), MovieController.search);
router.get('/trending', MovieController.checkQueryParams, MovieController.getTrendingMovies);
router.get('/:id', param('id').notEmpty().escape(), MovieController.searchById);

export default router;
