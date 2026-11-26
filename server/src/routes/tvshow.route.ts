import { Router } from 'express';
import { query, param } from 'express-validator';
import * as TVShowController from '@controllers/tvshow.controller';
import validateRequest from '../middlewares/validateRequest';

const router = Router();

router.get('/search', query('query').isString().bail().trim().notEmpty(), validateRequest, TVShowController.search);
router.get('/trending', TVShowController.checkQueryParams, TVShowController.getTrendingTVShows);
router.get('/:id', param('id').isInt({ min: 1 }), validateRequest, TVShowController.searchById);

export default router;
