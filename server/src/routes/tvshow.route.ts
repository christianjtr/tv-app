import { Router } from 'express';
import { query, param } from 'express-validator';
import * as TVShowController from '@controllers/tvshow.controller';

const router = Router();

router.get('/search', query('query').notEmpty().escape(), TVShowController.search);
router.get('/trending', TVShowController.checkQueryParams, TVShowController.getTrendingTVShows);
router.get('/:id', param('id').notEmpty().escape(), TVShowController.searchById);

export default router;
