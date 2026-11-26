import { Router } from 'express';
import { query, param } from 'express-validator';
import * as MovieController from '@controllers/movie.controller';
import validateRequest from '../middlewares/validateRequest';

const router = Router();

router.get('/search', query('query').isString().bail().trim().notEmpty(), validateRequest, MovieController.search);
router.get('/trending', MovieController.checkQueryParams, MovieController.getTrendingMovies);
router.get('/:id', param('id').isInt({ min: 1 }), validateRequest, MovieController.searchById);

export default router;
