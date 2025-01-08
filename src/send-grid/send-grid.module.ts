import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SendGridService } from './send-grid.service';
import { SendGridController } from './send-grid.controller';

@Module({
  imports: [ConfigModule],
  providers: [SendGridService],
  exports: [SendGridService],
  controllers: [SendGridController],
})
export class SendGridModule {}
