import { Test, TestingModule } from '@nestjs/testing';
import { SendGridController } from '../send-grid.controller';
import { SendGridService } from '../send-grid.service';
import { SendEmailDto } from '../dto/send-email.dto';

describe('SendGridController', () => {
  let controller: SendGridController;
  let service: SendGridService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SendGridController],
      providers: [
        {
          provide: SendGridService,
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SendGridController>(SendGridController);
    service = module.get<SendGridService>(SendGridService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('sendEmail', () => {
    it('should call sendEmail service method with correct parameters', async () => {
      const sendEmailDto: SendEmailDto = {
        recipient: 'test@example.com',
        templateId: 'templateId',
        metadata: { 'Test Key': 'Test Value' },
      };

      await controller.sendEmail(sendEmailDto);

      expect(service.send).toHaveBeenCalledWith(sendEmailDto);
    });

    it('should handle errors when email sending fails', async () => {
      const sendEmailDto: SendEmailDto = {
        recipient: 'test@example.com',
        templateId: 'templateId',
        metadata: { 'Test Key': 'Test Value' },
      };

      jest
        .spyOn(service, 'send')
        .mockRejectedValue(new Error('Failed to send email'));

      await expect(controller.sendEmail(sendEmailDto)).rejects.toThrow(
        'Failed to send email',
      );
    });
  });
});
