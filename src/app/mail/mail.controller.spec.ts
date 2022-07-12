import { Test, TestingModule } from '@nestjs/testing';
import { SaveMailDto } from './dto/save-mail.dto';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';
import { MailDocument } from './schemas/mail.schema';

describe('MailController', () => {
  let mailController: MailController;
  let mailService: MailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [
        {
          provide: MailService,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    mailController = module.get<MailController>(MailController);
    mailService = module.get<MailService>(MailService);
  });

  it('should be defined', () => {
    expect(mailController).toBeDefined();
    expect(mailService).toBeDefined();
  });

  describe('save', () => {
    it('should save a new email with success', async () => {
      const body: SaveMailDto = {
        destinationName: 'User',
        destinationAddress: 'user@email.com',
        dueDate: new Date(),
        subject: 'Email test',
        body: '<p>Hi</p>',
      };
      const mailSchemaMock = {
        ...body,
      } as MailDocument;
      jest.spyOn(mailService, 'save').mockResolvedValueOnce(mailSchemaMock);

      const result = await mailController.save(body);

      expect(result).toBeDefined();
      expect(mailService.save).toBeCalledTimes(1);
    });
  });
});
