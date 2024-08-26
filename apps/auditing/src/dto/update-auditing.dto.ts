import { PartialType } from '@nestjs/swagger';
import { CreateAuditingDto } from './create-auditing.dto';

export class UpdateAuditingDto extends PartialType(CreateAuditingDto) {}
