import { Test, TestingModule } from '@nestjs/testing';
import { SendGridService } from '../send-grid.service';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { SendEmailDto } from '../dto/send-email.dto';

jest.mock('@sendgrid/mail', () => ({
  setApiKey: jest.fn(),
  send: jest.fn(),
}));

describe('SendGridService', () => {
  let service: SendGridService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendGridService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key) => {
              if (key === 'SEND_GRID_API_KEY') return 'fake-api-key';
              if (key === 'SENDER_EMAIL') return 'sender@test.com';
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<SendGridService>(SendGridService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('constructor', () => {
    it('should set SendGrid API key on initialization', () => {
      expect(SendGrid.setApiKey).toHaveBeenCalledWith('fake-api-key');
    });
  });

  describe('send', () => {
    const mockEmailData: SendEmailDto = {
      recipient: 'test@example.com',
      templateId: 'templateId',
      metadata: { 'Test Key': 'Test Value' },
    };

    it('should successfully send an email', async () => {
      (SendGrid.send as jest.Mock).mockResolvedValue([
        {
          statusCode: 202,
          headers: {},
          body: {},
        },
      ]);

      await service.send(mockEmailData);

      expect(SendGrid.send).toHaveBeenCalledWith({
        to: mockEmailData.recipient,
        from: 'sender@test.com',
        templateId: mockEmailData.templateId,
        dynamicTemplateData: mockEmailData.metadata,
      });
    });

    it('should handle SendGrid errors', async () => {
      const errorMessage = 'Failed to send email';
      (SendGrid.send as jest.Mock).mockRejectedValue(new Error(errorMessage));

      await expect(service.send(mockEmailData)).rejects.toThrow(errorMessage);
    });
  });
});
