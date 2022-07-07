/* eslint-disable prettier/prettier */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ // ValidationPipe는 웹 애플리케이션으로 전송되는 데이터의 검증을 도와준다.
      whitelist: true, //Dto에 데코레이터가 없는 속성 객체를 제거한다.
      forbidNonWhitelisted: true, // 화이트리스트에 없는 속성 객체를 제거하는 대신 예외를 throw한다.
      transform: true, //Type 자동 변환을 활성화
  }));
  await app.listen(3000);
}
bootstrap();
