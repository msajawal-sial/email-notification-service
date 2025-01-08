import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendGridService } from './send-grid.service';
import { SendEmailDto } from './dto/send-email.dto';

@Controller()
export class SendGridController {
  constructor(private readonly sendGridService: SendGridService) {}

  @EventPattern({ cmd: 'send-email' })
  sendEmail(@Payload() email: SendEmailDto) {
    return this.sendGridService.send(email);
  }
}
