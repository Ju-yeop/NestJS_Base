/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

/**
 *? End-to-end testing
  개별 모듈과 클래스에 중점을 두는 Unit 테스트와 달리 end-to-end(e2e) 테스트는 
  보다 종합적인 수준에서 클래스와 모듈의 상호 작용을 다룹니다. 
  최종 사용자가 production 시스템과 갖게 될 상호 작용 유형에 더 가깝습니다. 
  애플리케이션이 성장함에 따라 각 API endpoint의 E2E 동작을 수동으로 테스트하기가 어려워집니다. 
  자동화된 E2E 테스트는 시스템의 전반적인 동작이 정확하고 프로젝트 요구 사항을 충족하는지 확인하는 데 도움이 됩니다. 
  Nest를 사용하면 Supertest 라이브러리를 사용하여 HTTP request를 쉽게 시뮬레이션할 수 있습니다.
 */

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ 
      whitelist: true, 
      forbidNonWhitelisted: true,
      transform: true,
  }));
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Welcome to Movie Api');
  });

  describe('/movies', () => {
    it('GET', () => {
      return request(app.getHttpServer())
      .get('/movies')
      .expect(200)
      .expect([])
    })

    it('POST 200', () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title:"TEST",
        year:2022,
        genres:["test"]
      })
      .expect(201);
    })

    it('POST 400', () => {
      return request(app.getHttpServer())
      .post('/movies')
      .send({
        title:"TEST",
        year:2022,
        genres:["test"],
        other: "things"
      })
      .expect(400);
    })

    it('DELETE', () => {
      return request(app.getHttpServer())
      .delete('/movies')
      .expect(404);
    })
  })

  describe('/movies/:id', () => {
    it('GET 200', () => {
      return request(app.getHttpServer())
      .get('/movies/1')
      .expect(200)
    })

    it('GET 404', () => {
      return request(app.getHttpServer())
      .get('/movies/999')
      .expect(404)
    })

    it('PATCH 200', () => {
      return request(app.getHttpServer())
      .patch('/movies/1')
      .send({title: 'Update Test'})
      .expect(200);
    })
    it('DELETE 200', () => {
      return request(app.getHttpServer())
      .delete('/movies/1')
      .expect(200);
    })
    
  })
});
