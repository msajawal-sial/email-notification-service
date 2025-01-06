import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendGridService } from './sendGrid.service';
import { SendGridController } from './sendGrid.controller';

@Module({
  imports: [ConfigModule],
  providers: [SendGridService],
  exports: [SendGridService],
  controllers: [SendGridController]
})
export class SendGridModule {}