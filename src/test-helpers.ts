import { ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { DataSource, DeleteResult } from 'typeorm';
import { AppModule } from './app.module';

export async function createNestApplication({
  onBeforeInit,
}: {
  onBeforeInit: (moduleRef: TestingModule) => void;
}) {
  const moduleRef = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  const app = moduleRef.createNestApplication();

  app.useGlobalPipes(new ValidationPipe());

  onBeforeInit(moduleRef);

  await app.init();

  return app;
}

export async function clearRepositories(dbConnection: DataSource) {
  const entities = dbConnection.entityMetadatas;
  const promises: Array<Promise<DeleteResult>> = [];

  for (const entity of entities) {
    const repository = dbConnection.getRepository(entity.name);
    promises.push(repository.delete({}));
  }

  await Promise.all(promises);
}
