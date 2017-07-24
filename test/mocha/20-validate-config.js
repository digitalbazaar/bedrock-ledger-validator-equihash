/*
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
/* globals should */

'use strict';

const bedrock = require('bedrock');
const async = require('async');
const brValidator = require('bedrock-ledger-guard-equihash');
const crypto = require('crypto');
const equihash = require('equihash')('khovratovich');

const mockData = require('./mock.data');

describe('validateConfiguration API', () => {
  it('validates a proper config', done => {
    const testConfig = mockData.ledgers.alpha.config.input[0].eventValidator[0];
    brValidator.validateConfiguration(testConfig, err => {
      should.not.exist(err);
      done();
    });
  });
  it('return ValidationError on missing equihashParameterN', done => {
    const testConfig = bedrock.util.clone(
      mockData.ledgers.alpha.config.input[0].eventValidator[0]);
    delete testConfig.equihashParameterN;
    brValidator.validateConfiguration(testConfig, err => {
      should.exist(err);
      err.name.should.equal('ValidationError');
      done();
    });
  });
  it('return ValidationError on missing equihashParameterK', done => {
    const testConfig = bedrock.util.clone(
      mockData.ledgers.alpha.config.input[0].eventValidator[0]);
    delete testConfig.equihashParameterK;
    brValidator.validateConfiguration(testConfig, err => {
      should.exist(err);
      err.name.should.equal('ValidationError');
      done();
    });
  });
});