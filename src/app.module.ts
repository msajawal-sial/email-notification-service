import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendGridModule } from './send-grid/send-grid.module';
import * as Joi from '@hapi/joi';

@Module({
  imports: [
    SendGridModule,
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        SENDER_EMAIL: Joi.string().required(),
        SEND_GRID_API_KEY: Joi.string().required(),
        RABBITMQ_USER: Joi.string().required(),
        RABBITMQ_PASSWORD: Joi.string().required(),
        RABBITMQ_HOST: Joi.string().required(),
        RABBITMQ_QUEUE_NAME: Joi.string().required(),
      }),
    }),
  ],
})
export class AppModule {}
