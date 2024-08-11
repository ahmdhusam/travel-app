import { Module } from '@nestjs/common';
import { AuditingController } from './auditing.controller';
import { AuditingService } from './auditing.service';
import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.example'] }),
    DatabaseModule,
  ],
  controllers: [AuditingController],
  providers: [AuditingService],
})
export class AuditingModule {}
