import { Module } from '@nestjs/common';
import { ConfigModule as NestjsConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestjsConfigModule.forRoot({})
  ],
})
export class ConfigModule {}
