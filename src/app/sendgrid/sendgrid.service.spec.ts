import { HttpService } from '@nestjs/axios';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { SendEmailInterface } from './interface/send-email.interface';
import { SendgridService } from './sendgrid.service';

describe('SendgridService', () => {
  let sendGridService: SendgridService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendgridService,
        {
          provide: HttpService,
          useValue: {
            post: jest.fn(),
          },
        },
      ],
    }).compile();

    sendGridService = module.get<SendgridService>(SendgridService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(sendGridService).toBeDefined();
    expect(httpService).toBeDefined();
  });

  describe('sendMail', () => {
    it('should send an email with success', async () => {
      const data: SendEmailInterface = {
        personalizations: [
          {
            to: [
              {
                name: 'User1',
                email: 'user1@email.com',
              },
            ],
          },
        ],
        from: {
          name: 'User2',
          email: 'user2@email.com',
        },
        reply_to: {
          name: 'User2',
          email: 'user2@email.com',
        },
        subject: 'Subject here',
        content: [
          {
            type: 'text/html',
            value: '<p>Subject here</p>',
          },
        ],
      };
      jest.spyOn(httpService, 'post').mockReturnValueOnce(
        of({
          status: 202,
          statusText: 'ACCEPTED',
          config: {},
          headers: {},
          data: '',
        }),
      );

      const result = await sendGridService.sendEmail(data);

      expect(result).toBeTruthy();
      expect(httpService.post).toBeCalledTimes(1);
    });
  });
});
