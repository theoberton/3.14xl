import { UserController } from '../../src/controller/user-controller';
import { Info } from '../../src/model/info';
import request from 'supertest';
import express, {Express} from 'express';
import bodyParser from 'body-parser';
import { useExpressServer } from 'routing-controllers';
import { GlobalErrorHandler } from '../../src/middleware/global-error-handler';

describe('UserController', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });
  let server: Express | undefined;

  beforeAll(async () => {
    server = express();
    server.use(bodyParser.json());
    useExpressServer(server, {
      controllers: [UserController], // we specify controllers we want to use
      middlewares: [GlobalErrorHandler],
      defaultErrorHandler: false
    });
  });

  it('postOne', () => {
    const userController = new UserController();
    const testBody = {
    // country: 'Russia',
      city: 'SPb'
    };
    const res = userController.postOne(1, testBody as Info);
    expect(res).toBeUndefined();
  });

  it('postOne with validations', done => {
    request(server)
      .post('/users/1')
      .send({
        country: 'Russia',
        city: 'SPb'
      } as Info)
      .expect(204)
      .end((err, res) => {
        if (err) throw new Error(JSON.stringify(res.body));
        done();
      });
  });
});