import { Test, TestingModule } from '@nestjs/testing';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/users.schema';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

const usersSchemaList = [
  new User({
    name: 'User1',
    email: 'user1@hotmail.com',
  }),
  new User({
    name: 'User2',
    email: 'user2@hotmail.com',
  }),
];

const newUserSchema = new User({
  name: 'NewUser',
  email: 'newuser@hotmail.com',
  password: 'Newuser@123',
});

const updatedUserSchema = new User({
  name: 'UpdatedUser',
  email: 'updateduser@hotmail.com',
  password: 'Updateduser@123',
});

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            findAllUsers: jest.fn().mockResolvedValue(usersSchemaList),
            findOneUser: jest.fn().mockResolvedValue(usersSchemaList[0]),
            createUser: jest.fn().mockResolvedValue(newUserSchema),
            updateUser: jest.fn().mockResolvedValue(updatedUserSchema),
            removeUser: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(usersController).toBeDefined();
    expect(usersService).toBeDefined();
  });

  describe('findAllUsers', () => {
    it('should return a users list schema sucessfully', async () => {
      const result = await usersController.findAllUsers();

      expect(result).toEqual(usersSchemaList);
      expect(typeof result).toEqual('object');
      expect(usersService.findAllUsers).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      jest
        .spyOn(usersService, 'findAllUsers')
        .mockRejectedValueOnce(new Error());

      expect(usersController.findAllUsers()).rejects.toThrowError();
    });
  });

  describe('findOneUser', () => {
    it('should return one user sucessfully', async () => {
      const result = await usersController.findOneUser('1');

      expect(result).toEqual(usersSchemaList[0]);
      expect(usersService.findOneUser).toHaveBeenCalledTimes(1);
      expect(usersService.findOneUser).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      jest
        .spyOn(usersService, 'findOneUser')
        .mockRejectedValueOnce(new Error());

      expect(usersController.findOneUser('1')).rejects.toThrowError();
    });
  });

  describe('createUser', () => {
    it('should create a new user sucessfully', async () => {
      const body: CreateUserDto = {
        name: 'NewUser',
        email: 'newuser@hotmail.com',
        password: 'Newuser@123',
      };

      const result = await usersController.createUSer(body);

      expect(result).toEqual(newUserSchema);
      expect(usersService.createUser).toHaveBeenCalledTimes(1);
      expect(usersService.createUser).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      const body: CreateUserDto = {
        name: 'NewUser',
        email: 'newuser@hotmail.com',
        password: 'Newuser@123',
      };

      jest.spyOn(usersService, 'createUser').mockRejectedValueOnce(new Error());

      expect(usersController.createUSer(body)).rejects.toThrowError();
    });
  });

  describe('updateUser', () => {
    it('should update a user sucessfully', async () => {
      const body: UpdateUserDto = {
        name: 'UpdatedUser',
        email: 'updateduser@hotmail.com',
        password: 'Updateduser@123',
      };

      const result = await usersController.updateUser('1', body);

      expect(result).toEqual(updatedUserSchema);
      expect(usersService.updateUser).toHaveBeenCalledTimes(1);
      expect(usersService.updateUser).toHaveBeenCalledWith('1', body);
    });

    it('should throw an exception', () => {
      const body: UpdateUserDto = {
        name: 'UpdatedUser',
        email: 'updateduser@hotmail.com',
        password: 'Updateduser@123',
      };

      jest.spyOn(usersService, 'updateUser').mockRejectedValueOnce(new Error());

      expect(usersController.updateUser('1', body)).rejects.toThrowError();
    });
  });

  describe('removeUser', () => {
    it('should remove a user sucessfully', async () => {
      const result = await usersController.removeUser('1');

      expect(result).toBeUndefined();
    });

    it('should throw an exception', () => {
      jest.spyOn(usersService, 'removeUser').mockRejectedValueOnce(new Error());

      expect(usersController.removeUser('1')).rejects.toThrowError();
    });
  });
});
