import { expect } from 'chai';
import sinon from 'sinon';

import express from 'express';

import {
  Ad
} from '../../../models';

import {
  createAd,
  updateAdById,
} from './index';

import ads from '../../../../data/mock/ads';

describe('api ads', function () {
  describe('Ad route handlers', function () {
    describe('createAd', function () {
      let stubAdCreate;

      const payload = {
        description: 'The ad description'
      };

      const SUCCESS_CREATE = {
        description: payload.description,
        isVisible: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const FAILURE_ERROR = new Error('Failed to create Ad');

      before(function () {
        stubAdCreate = sinon.stub(Ad, 'create');
      });

      after(function () {
        stubAdCreate.restore();
      });

      it('should pass the error to callback', function () {
        stubAdCreate.returns(new Promise((resolve, reject) => reject(FAILURE_ERROR)));

        return createAd(payload)
        .catch(err => {
          expect(err).to.equal(FAILURE_ERROR);
        });
      });

      it('should try to create an ad given json data', function () {
        stubAdCreate.returns(new Promise((resolve, reject) => resolve(SUCCESS_CREATE)));

        return createAd(payload)
        .then(ad => {
          expect(ad).to.equal(SUCCESS_CREATE);
        });
      });
    });

    describe('updateAdById', function () {
      let stubAdFindById;
      let stubExistingAdUpdate;

      const existingAd = ads[0]; // { id: 1, description: "The greatest advertisement ever!", isVisible: true }
      existingAd.update = () => {};

      const payload = {
        description: "The new description",
        isVisible: false,
      };

      const SUCCESS_UPDATE = {
        description: payload.description,
        isVisible: payload.isVisible,
        createdAt: existingAd.createdAt,
        updatedAt: new Date(),
      };

      const QUERY_FAILURE_ERROR = new Error('Failed to query Ad');
      const UPDATE_FAILURE_ERROR = new Error('Failed to update Ad');

      before(function () {
        stubAdFindById = sinon.stub(Ad, 'findById');
        stubExistingAdUpdate = sinon.stub(existingAd, 'update') ;
      });

      after(function () {
        stubAdFindById.restore();
      });

      it('should query Ads by id', function () {
        stubAdFindById.returns(new Promise((resolve, reject) => reject()));
        return updateAdById(existingAd.id, payload)
        .catch(() => {
          const calledWithId= stubAdFindById.calledWith(existingAd.id);
          expect(calledWithId, 'expected ad to be queried by id before updating').to.be.true;
        });
      });

      it('should pass the error to if query failed', function () {
        stubAdFindById.returns(new Promise((resolve, reject) => reject(QUERY_FAILURE_ERROR)));

        return updateAdById(existingAd.id, payload)
        .catch(err => {
          expect(err).to.equal(QUERY_FAILURE_ERROR);
        });
      });

      it('should pass the payload to the query', function () {
        stubAdFindById.returns(new Promise((resolve, reject) => resolve(existingAd)));
        stubExistingAdUpdate.returns(new Promise((resolve, reject) => reject()));

        return updateAdById(existingAd.id, payload)
        .catch(() => {
          const calledWithPayload= stubExistingAdUpdate.calledWith(payload);
          expect(calledWithPayload, 'expected ad to be updated with the payload').to.be.true;
        });
      });

      it('should pass the error to if update failed', function () {
        stubAdFindById.returns(new Promise((resolve, reject) => resolve(existingAd)));
        stubExistingAdUpdate.returns(new Promise((resolve, reject) => reject(UPDATE_FAILURE_ERROR)));

        return updateAdById(existingAd.id, payload)
        .catch(err => {
          expect(err).to.equal(UPDATE_FAILURE_ERROR);
        });
      });

      it('should update an existing ad', function () {
        stubAdFindById.returns(new Promise((resolve, reject) => resolve(existingAd)));
        stubExistingAdUpdate.returns(new Promise((resolve, reject) => resolve(SUCCESS_UPDATE)));

        return updateAdById(existingAd.id, payload)
        .then(ad => {
          expect(ad).to.equal(SUCCESS_UPDATE);
        });
      });
    });
  });
});
