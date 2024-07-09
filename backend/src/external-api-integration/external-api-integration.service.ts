import { Injectable } from '@nestjs/common';
import { CreateExternalApiIntegrationDto } from './dto/create-external-api-integration.dto';
import { UpdateExternalApiIntegrationDto } from './dto/update-external-api-integration.dto';

@Injectable()
export class ExternalApiIntegrationService {
  create(createExternalApiIntegrationDto: CreateExternalApiIntegrationDto) {
    return 'This action adds a new externalApiIntegration';
  }

  findAll() {
    return `This action returns all externalApiIntegration`;
  }

  findOne(id: number) {
    return `This action returns a #${id} externalApiIntegration`;
  }

  update(
    id: number,
    updateExternalApiIntegrationDto: UpdateExternalApiIntegrationDto,
  ) {
    return `This action updates a #${id} externalApiIntegration`;
  }

  remove(id: number) {
    return `This action removes a #${id} externalApiIntegration`;
  }
}
