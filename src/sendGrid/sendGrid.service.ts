import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import SendEmailDto from './dto/sendEmailDto';

@Injectable()
export class SendGridService {
    private logger: Logger;
  constructor(private readonly configService: ConfigService) {
    this.logger = new Logger(SendGridService.name)
    SendGrid.setApiKey(configService.get('SEND_GRID_API_KEY'));
  }

  async send({recipient, templateId, metadata}: SendEmailDto) {
    const mail: SendGrid.MailDataRequired = {
        to: recipient,
        from: this.configService.get('SENDER_EMAIL'),
        templateId: templateId,
        dynamicTemplateData: metadata
    };
    
    try {
        await SendGrid.send(mail);
        this.logger.log(`Email successfully dispatched to ${mail.to as string}`);
      } catch (error) {
        this.logger.error('Error while sending email', error);
        throw error;
      }
  }
}