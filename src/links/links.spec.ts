import { INestApplication } from '@nestjs/common';
import { DataSource } from 'typeorm';
import * as request from 'supertest';
import { faker } from '@faker-js/faker';
import { clearRepositories, createNestApplication } from '../test-helpers';
import { LinksRepository } from './links.repository';
import { Link } from './link.entity';

describe('Links', () => {
  let app: INestApplication;
  let dbConnection: DataSource;
  let linksRepository: LinksRepository;
  const createLinkItem = async () => {
    return linksRepository.createLink({
      name: faker.word.noun(),
      url: faker.internet.url(),
    });
  };

  beforeAll(async () => {
    app = await createNestApplication({
      onBeforeInit: (moduleRef) => {
        dbConnection = moduleRef.get(DataSource);
        linksRepository = moduleRef.get(LinksRepository);
      },
    });
  });

  beforeEach(async () => {
    await clearRepositories(dbConnection);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/links (GET)', () => {
    it('should handle without data', async () => {
      const res = await request(app.getHttpServer()).get('/links');

      expect(res.status).toBe(200);
      expect(res.body).toEqual([]);
    });

    it('should handle with data', async () => {
      const links: Array<Link> = [];
      const linksCount = 3;

      for (let i = 0; i < linksCount; i++) {
        links.push(await createLinkItem());
      }

      const res = await request(app.getHttpServer()).get('/links');
      const resBody = res.body;

      expect(res.status).toBe(200);
      expect(resBody).toEqual(JSON.parse(JSON.stringify(links)));
    });
  });
});
