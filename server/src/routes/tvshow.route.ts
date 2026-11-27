import { Router } from 'express';
import { query, param } from 'express-validator';
import * as TVShowController from '@controllers/tvshow.controller';
import validateRequest from '../middlewares/validateRequest';

const router = Router();

router.get('/search', query('query').isString().bail().trim().notEmpty(), validateRequest, TVShowController.search);
router.get('/trending', TVShowController.checkQueryParams, TVShowController.getTrendingTVShows);
router.get(
    '/:id/seasons/:seasonNumber/episode-ratings',
    param('id').isInt({ min: 1, max: 2_147_483_647 }),
    param('seasonNumber').isInt({ min: 0, max: 2_147_483_647 }),
    validateRequest,
    TVShowController.getEpisodeRatings
);
router.get('/:id', param('id').isInt({ min: 1 }), validateRequest, TVShowController.searchById);

export default router;
