import { PartialType } from '@nestjs/swagger';
import { CreateExternalApiIntegrationDto } from './create-external-api-integration.dto';

export class UpdateExternalApiIntegrationDto extends PartialType(
  CreateExternalApiIntegrationDto,
) {}
