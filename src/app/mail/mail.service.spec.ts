import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { FindAllMailDto } from './dto/find-all-mail.dto';
import { SaveMailDto } from './dto/save-mail.dto';
import { MailStatusEnum } from './enum/mail-status.enum';
import { MailService } from './mail.service';
import { Mail, MailDocument } from './schemas/mail.schema';

const mailSchemaMock = {
  destinationName: 'User',
  destinationAddress: 'user@email.com',
  dueDate: new Date(),
  subject: 'Email test',
  body: '<p>Hi</p>',
} as Mail;

const mailSchemaMockList = [
  {
    destinationName: 'User1',
    dueDate: new Date(),
    status: MailStatusEnum.WAITING,
  },
  {
    destinationName: 'User2',
    dueDate: new Date(),
    status: MailStatusEnum.WAITING,
  },
] as Mail[];

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
            find: jest.fn().mockResolvedValue(mailSchemaMockList),
            findOne: jest.fn().mockResolvedValue(mailSchemaMock),
            updateOne: jest.fn().mockReturnValue(undefined),
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

  describe('findAll', () => {
    it('should return a filtered mail list with dueDateLte successfully', async () => {
      const params: Partial<FindAllMailDto> = { dueDateLte: new Date() };

      const result = await mailService.findAll(params);

      expect(result).toBeDefined();
      expect(result).toHaveLength(2);
    });

    it('should return a filtered mail list with WAITING status successfully', async () => {
      const params: Partial<FindAllMailDto> = {
        status: MailStatusEnum.WAITING,
      };

      const result = await mailService.findAll(params);

      expect(result).toBeDefined();
      expect(result).toHaveLength(2);
    });
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

  describe('updateStatus', () => {
    it('should update mail status with success', async () => {
      const id = '1';

      const result = await mailService.updateStatus(id, MailStatusEnum.SENT);

      expect(result).toBeUndefined();
    });
  });
});
