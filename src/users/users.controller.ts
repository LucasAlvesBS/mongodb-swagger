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
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request.swagger';
import { NotFoundSwagger } from 'src/helpers/swagger/not-found.swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersDocument } from './schemas/users.schema';
import { CreateUserSwagger } from './swagger/create-user.swagger';
import { IndexUserSwagger } from './swagger/index-user.swagger';
import { ShowUserSwagger } from './swagger/show-user.swagger';
import { UsersService } from './users.service';

@Controller('api/v1/users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({
    status: 200,
    description: 'Lista de usuários retornada com sucesso',
    type: IndexUserSwagger,
    isArray: true,
  })
  async findAllUsers(): Promise<UsersDocument[]> {
    return await this.usersService.findAllUsers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Exibir um usuário' })
  @ApiResponse({
    status: 200,
    description: 'Perfil do usuário retornado com sucesso',
    type: ShowUserSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: NotFoundSwagger,
  })
  async findOneUser(@Param('id') id: string): Promise<UsersDocument> {
    return await this.usersService.findOneUser(id);
  }

  @Post()
  @ApiOperation({ summary: 'Criar um usuário' })
  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: CreateUserSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: BadRequestSwagger,
  })
  async createUSer(@Body() body: CreateUserDto): Promise<UsersDocument> {
    return await this.usersService.createUser(body);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualziar um usuário' })
  @ApiResponse({
    status: 204,
    description: 'Usuário atualizado com sucesso',
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: NotFoundSwagger,
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  async updateUser(
    @Param('id') id: string,
    @Body() body: UpdateUserDto,
  ): Promise<UsersDocument> {
    return await this.usersService.updateUser(id, body);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover um usuário' })
  @ApiResponse({ status: 204, description: 'Usuário removido com sucesso' })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
    type: NotFoundSwagger,
  })
  async removeUser(@Param('id') id: string) {
    return await this.usersService.removeUser(id);
  }
}
