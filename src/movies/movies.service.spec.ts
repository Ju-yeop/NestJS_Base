/* eslint-disable prettier/prettier */
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  /**
    *?beforeEach
    각각의 테스트가 실행되기 전에 매번 함수를 실행합니다.
    각각의 테스트 전에 각 테스트에서 사용할 전역 상태를 재설정하려는 경우에 유용합니다.
    함수가 promise을 반환하거나 generator인 경우 Jest는 테스트를 실행하기 전에 해당 promise가 해결될 때까지 기다립니다.
    *?beforeAll(fn, timeout)
    모든 테스트가 실행되기 전에 딱 한 번 함수를 실행합니다.
    *?afterEach(fn, timeout)
    각각의 테스트가 완료된 후 함수를 실행합니다.
    *?afterAll(fn, timeout)
    모든 테스트가 완료된 후 함수를 실행합니다.
  */
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService], 
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it("should be return Array", () => {
      const movies = service.getAll();
      expect(movies).toBeInstanceOf(Array);
    })
  })

  describe('getMovie', () => {
    it('should be return Movie', () => {
      service.createMovie({
        title: 'Test Movie',
        year: 2022,
        genres: ['test']
      })
      const movie = service.getMovie(1);
      expect(movie).toBeDefined();
    })

    it('should be return 404 error', () => {
      try {
        service.getMovie(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    })
  })

  describe('deleteMovie', () => {
    it('should delete', () =>{
      service.createMovie({
        title: 'Test Movie',
        year: 2022,
        genres: ['test']
      });
      const beforeDelete = service.getAll().length;
      service.deleteMovie(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    })

    it('should return 404 error', () => {
      try {
        service.deleteMovie(999);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    })
  })

  describe('createMovie', () =>{
    it('should create a movie', () => {
      const beforeCreate = service.getAll().length;
      service.createMovie({
        title: 'Test Movie',
        year: 2022,
        genres: ['test']
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    })
  })

  describe('updateMovie', () => {
    it('should update a movie', () => {
      service.createMovie({
        title: 'Test Movie',
        year: 2022,
        genres: ['test']
      });
      service.patchMovie(1, {title:"Updated Movie"});
      const updatedMovie = service.getMovie(1);
      expect(updatedMovie.title).toEqual("Updated Movie");
    })

    it('should return 404 error', () => {
      try {
        service.patchMovie(999, {});
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundException);
      }
    })
  })
});


