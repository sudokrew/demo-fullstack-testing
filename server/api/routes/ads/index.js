import { Router } from 'express';

import {
  Ad,
} from '../../../models';

import {
  parseCheckboxValue
} from '../../../middleware/parseBody';

import {
  validateLength
} from '../../../middleware/validation';

const router = Router();

router.route('/')
  /**
   * Validates and creates an ad.
   */
  .post(
    validateLength('description', { min: 25, max: 140 }),
    function postAdHandler (req, res, next) {
      return createAd(req.body)
        .then(ad => res.json(ad))
        .catch(next);
    }
  );

router.route('/:id')
  /**
   * Edits an existing ad
   */
  .put(
    parseCheckboxValue('isVisible'),
    function putAdHandler (req, res, next) {
      return updateAdById(req.params.id, req.body)
        .then(ad => res.json(ad))
        .catch(next);
    }
  );

export default router;

/**
 * Creates an ad.
 * @param  {Object} payload  An object containing the description of the Ad to be created
 * @return {Promise}         Resolves to an Ad object, rejects with reason why save failed
 */
export function createAd (payload) {
  return Ad.create(payload);
}


/**
 * Creates an ad.
 * @param  {Object} payload  An object containing the description of the Ad to be created
 * @return {Promise}         Resolves to an Ad object, rejects with reason why save failed
 */
export async function updateAdById (id, payload) {
  const ad = await Ad.findById(id);
  return ad.update(payload);
}
