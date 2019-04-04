/* eslint no-shadow: ["error", { "allow": ["t"] }] */
import test from 'tape';
import debug from 'debug';
// import HTTPStatus from 'http-status';
import supertest from 'supertest';
import app from '../src/app';

const request = supertest(app); // eslint-disable-line
const log = debug('auth:test'); // eslint-disable-line
// const baseUrl = '/api';

test.onFinish(() => process.exit(0));

test('auth API', t => {
  t.test('POST /auth/login', t => {
    t.test('ERROR Scenarios', t => {
      t.test(
        'should not login with an email that does not exist',
        async assert => {
          assert.end();
        },
      );

      t.test('should not login with an invalid password', async assert => {
        assert.end();
      });
    });

    t.test('SUCCESS Scenarios', t => {
      t.test('should login with a valid email and password', async assert => {
        assert.end();
      });
    });
  });

  t.test('GET /auth/logout', t => {
    t.test('ERROR Scenarios', t => {
      t.test('should not logout when the JWT is invalid', async assert => {
        assert.end();
      });
    });

    t.test('SUCCESS Scenarios', t => {
      t.test('should logout with a valid JWT', async assert => {
        assert.end();
      });
    });
  });
});
