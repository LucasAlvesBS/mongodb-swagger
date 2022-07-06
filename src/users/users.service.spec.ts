import { ConflictException, NotFoundException } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UsersDocument } from './schemas/users.schema';
import { UsersService } from './users.service';

const usersSchemaList = [
  new User({
    name: 'User3',
    email: 'user3@hotmail.com',
    password: 'user3@hotmail.com',
  }),
  new User({
    name: 'User2',
    email: 'user2@hotmail.com',
    password: 'user2@hotmail.com',
  }),
];

describe('UsersService', () => {
  let usersService: UsersService;
  let usersModel: Model<UsersDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getModelToken('Users'),
          useValue: {
            find: jest.fn().mockResolvedValue(usersSchemaList),
            findById: jest.fn().mockResolvedValue(usersSchemaList[0]),
            findOne: jest.fn(),
            create: jest.fn().mockReturnValue({
              save: jest.fn().mockReturnValue(usersSchemaList[0]),
            }),
            updateOne: jest.fn().mockResolvedValue(undefined),
            deleteOne: jest.fn().mockReturnValue(undefined),
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersModel = module.get<Model<UsersDocument>>(getModelToken('Users'));
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(usersModel).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('should return a users schema list sucessfully', async () => {
      const result = await usersService.findAllUsers();

      expect(result).toEqual(usersSchemaList);
      expect(usersModel.find).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest.spyOn(usersModel, 'find').mockRejectedValueOnce(new Error());

      expect(usersService.findAllUsers()).rejects.toThrowError();
    });
  });

  describe('findOneUser', () => {
    it('should return one users sucessfully', async () => {
      const result = await usersService.findOneUser('1');

      expect(result).toEqual(usersSchemaList[0]);
      expect(usersModel.findById).toHaveBeenCalledTimes(1);
      expect(usersModel.findById).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      jest
        .spyOn(usersModel, 'findById')
        .mockRejectedValueOnce(new NotFoundException());

      expect(usersService.findOneUser('1')).rejects.toThrowError(
        NotFoundException,
      );
    });
  });

  describe('createUser', () => {
    it('should create a user sucessfully', async () => {
      const body: CreateUserDto = {
        name: 'NewUser',
        email: 'newuser@hotmail.com',
        password: 'Newuser@123',
      };

      const result = await usersService.createUser(body);

      expect(result).toEqual(usersSchemaList[0]);
      expect(usersModel.create).toHaveBeenCalledTimes(1);
      expect(usersModel.create).toHaveBeenCalledWith(body);
    });
  });

  describe('updateUser', () => {
    it('should update a user sucessfully', async () => {
      const body: UpdateUserDto = {
        name: 'UpdatedUser',
        email: 'updateduser@hotmail.com',
        password: 'Updateduser@123',
      };
      const result = await usersService.updateUser('1', body);

      expect(result).toBeUndefined();
      expect(usersModel.findById).toHaveBeenCalledTimes(1);
      expect(usersModel.findOne).toHaveBeenCalledTimes(1);
      expect(usersModel.updateOne).toHaveBeenCalledTimes(1);
      expect(usersModel.findById).toHaveBeenCalledWith('1');
      expect(usersModel.findOne).toHaveBeenCalledWith({
        email: 'updateduser@hotmail.com',
      });
      expect(usersModel.updateOne).toHaveBeenCalledWith({ _id: '1' }, body);
    });

    it('should throw exceptions', () => {
      const body: UpdateUserDto = {
        name: 'UpdatedUser',
        email: 'updateduser@hotmail.com',
        password: 'Updateduser@123',
      };

      jest
        .spyOn(usersModel, 'findById')
        .mockRejectedValueOnce(new NotFoundException());

      expect(usersService.updateUser('1', body)).rejects.toThrowError(
        NotFoundException,
      );

      jest
        .spyOn(usersModel, 'findOne')
        .mockRejectedValueOnce(new ConflictException());

      expect(usersService.updateUser('1', body)).rejects.toThrowError(
        ConflictException,
      );
    });
  });

  describe('removeUser', () => {
    it('should remove a user sucessfully', async () => {
      const result = await usersService.removeUser('1');

      expect(result).toBeUndefined();
      expect(usersModel.findById).toHaveBeenCalledTimes(1);
      expect(usersModel.deleteOne).toHaveBeenCalledTimes(1);
      expect(usersModel.findById).toHaveBeenCalledWith('1');
      expect(usersModel.deleteOne).toHaveBeenCalledWith({ _id: '1' });
    });

    it('should throw an exception', () => {
      jest.spyOn(usersModel, 'deleteOne').mockRejectedValueOnce(new Error());

      expect(usersService.removeUser('1')).rejects.toThrowError();
    });
  });
});
