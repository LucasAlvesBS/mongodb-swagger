import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestSwagger } from '../../helpers/swagger.helper';
import { SaveMailDto } from './dto/save-mail.dto';
import { MailService } from './mail.service';
import { CreateMailSwagger } from './swagger/create-mail.swagger';

@Controller('api/v1/mails')
@ApiTags('mails')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post()
  @ApiOperation({ summary: 'Create a mail' })
  @ApiResponse({
    status: 201,
    description: 'Mail created successfully',
    type: CreateMailSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid data',
    type: BadRequestSwagger,
  })
  async save(@Body() body: SaveMailDto) {
    return this.mailService.save(body);
  }
}
