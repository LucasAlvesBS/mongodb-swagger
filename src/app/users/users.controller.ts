import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { BadRequestSwagger } from '../../helpers/swagger.helper';
import { NotFoundSwagger } from '../../helpers/swagger.helper';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersDocument } from './schemas/users.schema';
import { CreateUserSwagger } from './swagger/create-user.swagger';
import { IndexUserSwagger } from './swagger/index-user.swagger';
import { ShowUserSwagger } from './swagger/show-user.swagger';
import { UsersService } from './users.service';
import { v4 as uuidv4 } from 'uuid';
import { of } from 'rxjs';
import { join } from 'path';
import { Response } from 'express';

@Controller('api/v1/users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'List all users' })
  @ApiResponse({
    status: 200,
    description: 'User list returned successfully',
    type: IndexUserSwagger,
    isArray: true,
  })
  async findAllUsers(
    @Res({ passthrough: true }) response: Response,
  ): Promise<UsersDocument[]> {
    const users = await this.usersService.findAllUsers();
    response.cookie('users', users, { httpOnly: true });
    return users;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Display a user' })
  @ApiResponse({
    status: 200,
    description: 'A user returned successfully',
    type: ShowUserSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: NotFoundSwagger,
  })
  async findOneUser(@Param('id') id: string): Promise<UsersDocument> {
    return await this.usersService.findOneUser(id);
  }

  @Get('pictures/:filename')
  @ApiOperation({ summary: 'Display a picture' })
  @ApiResponse({
    status: 200,
    description: 'A picture returned successfully',
  })
  getPicture(@Param('filename') filename, @Res() res: Response) {
    return of(
      res.sendFile(join(process.cwd(), 'src/users/uploads/' + filename)),
    );
  }

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 201,
    description: 'User created successfully',
    type: CreateUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
    type: BadRequestSwagger,
  })
  async createUSer(@Body() body: CreateUserDto): Promise<UsersDocument> {
    return await this.usersService.createUser(body);
  }

  @Post('upload/:id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './src/users/uploads',
        filename: (req, file, cb) => {
          const filename: string = file.originalname.split('.')[0];
          const extension: string = file.originalname.split('.')[1];
          const newFileName: string =
            filename.split(' ').join('_') + '_' + uuidv4() + '.' + extension;

          cb(null, newFileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
          return cb(null, false);
        }
        return cb(null, true);
      },
    }),
  )
  @ApiOperation({ summary: 'File upload' })
  @ApiResponse({
    status: 201,
    description: 'File upload successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid file',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: NotFoundSwagger,
  })
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    if (!file) {
      throw new BadRequestException('File is not an image');
    } else {
      await this.usersService.updateUser(id, {
        profileImage: file.filename,
      });
      return of(
        res.sendFile(join(process.cwd(), 'src/users/uploads/' + file.filename)),
      );
    }
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 204,
    description: 'User updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: NotFoundSwagger,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<void> {
    return await this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove a user' })
  @ApiResponse({ status: 204, description: 'User removed successfully' })
  @ApiResponse({
    status: 404,
    description: 'User not found',
    type: NotFoundSwagger,
  })
  async removeUser(@Param('id') id: string) {
    return await this.usersService.removeUser(id);
  }
}
