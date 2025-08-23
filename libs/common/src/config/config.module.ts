import { Module } from '@nestjs/common';
import { ConfigModule as NestjsConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    NestjsConfigModule.forRoot({
      validationSchema: Joi.object({
        MONGODB_URI: Joi.string().required(),
      }),
    })
  ],
})
export class ConfigModule {}
