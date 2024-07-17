import { Module } from '@nestjs/common';
import { LoggingAndMonitoringController } from './logging-and-monitoring.controller';
import { LoggingAndMonitoringService } from './logging-and-monitoring.service';
import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.example'] }),
    DatabaseModule,
  ],
  controllers: [LoggingAndMonitoringController],
  providers: [LoggingAndMonitoringService],
})
export class LoggingAndMonitoringModule {}
