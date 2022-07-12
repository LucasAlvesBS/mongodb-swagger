import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { SaveMailDto } from './dto/save-mail.dto';
import { MailService } from './mail.service';
import { Mail, MailDocument } from './schemas/mail.schema';

const mailSchemaMock = {
  destinationName: 'User',
  destinationAddress: 'user@email.com',
  dueDate: new Date(),
  subject: 'Email test',
  body: '<p>Hi</p>',
} as Mail;

describe('MailService', () => {
  let mailService: MailService;
  let mailModel: Model<MailDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MailService,
        {
          provide: getModelToken(Mail.name),
          useValue: {
            create: jest.fn().mockReturnValue({
              save: jest.fn().mockResolvedValue(mailSchemaMock),
            }),
          },
        },
      ],
    }).compile();

    mailService = module.get<MailService>(MailService);
    mailModel = module.get<Model<MailDocument>>(getModelToken(Mail.name));
  });

  it('should be defined', () => {
    expect(mailService).toBeDefined();
    expect(mailModel).toBeDefined();
  });

  describe('save', () => {
    it('should save a new mail with success', async () => {
      const data: SaveMailDto = {
        ...mailSchemaMock,
      };

      const result = await mailService.save(data);

      expect(result).toBeDefined();
      expect((await mailModel.create(data)).save).toBeCalledTimes(1);
    });
  });
});
