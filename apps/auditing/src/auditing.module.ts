import { Module } from '@nestjs/common';
import { AuditingController } from './auditing.controller';
import { AuditingService } from './auditing.service';
import { DatabaseModule } from '@app/database';

@Module({
  imports: [DatabaseModule],
  controllers: [AuditingController],
  providers: [AuditingService],
})
export class AuditingModule {}
