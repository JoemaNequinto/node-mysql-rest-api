/* eslint no-shadow: ["error", { "allow": ["t"] }] */
import test from 'tape';
import debug from 'debug';
// import faker from 'faker';
// import HTTPStatus from 'http-status';
import supertest from 'supertest';
import app from '../src/app';

const request = supertest(app); // eslint-disable-line
const log = debug('user.test'); // eslint-disable-line
// const baseURL = '/api';

test('user API', t => {
  t.test('GET /users', t => {
    t.test('ERROR Scenarios', t => {
      t.test(
        'should not allow to get the users with an invalid JWT token',
        async assert => {
          assert.end();
        },
      );
    });

    t.test('SUCCESS Scenarios', t => {
      t.test('should get all the users', async assert => {
        assert.end();
      });
    });
  });

  t.test('GET /users/:username', t => {
    t.test('ERROR Scenarios', t => {
      t.test(
        'should not allow to get the users with an invalid JWT token',
        async assert => {
          assert.end();
        },
      );
    });

    t.test('SUCCESS Scenarios', t => {
      t.test('should get a user', async assert => {
        assert.end();
      });
    });
  });

  t.test('POST /users/register', t => {
    t.test('ERROR Scenarios', t => {
      t.test(
        'should not register with different password and confirmPassword',
        async assert => {
          assert.end();
        },
      );
      t.test('should not register with already used username', async assert => {
        assert.end();
      });
      t.test('should not register with already used email', async assert => {
        assert.end();
      });
    });

    t.test('SUCCESS Scenarios', t => {
      t.test('should register a user normally', async assert => {
        assert.end();
      });
    });
  });
});
