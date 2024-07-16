import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExternalApiIntegrationService } from './external-api-integration.service';
import { CreateExternalApiIntegrationDto } from './dto/create-external-api-integration.dto';
import { UpdateExternalApiIntegrationDto } from './dto/update-external-api-integration.dto';

@Controller('external-api-integration')
export class ExternalApiIntegrationController {
  constructor(
    private readonly externalApiIntegrationService: ExternalApiIntegrationService,
  ) {}

  @Post()
  create(
    @Body() createExternalApiIntegrationDto: CreateExternalApiIntegrationDto,
  ) {
    return this.externalApiIntegrationService.create(
      createExternalApiIntegrationDto,
    );
  }

  @Get()
  findAll() {
    return this.externalApiIntegrationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.externalApiIntegrationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExternalApiIntegrationDto: UpdateExternalApiIntegrationDto,
  ) {
    return this.externalApiIntegrationService.update(
      +id,
      updateExternalApiIntegrationDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.externalApiIntegrationService.remove(+id);
  }
}
