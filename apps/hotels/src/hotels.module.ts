import { Module } from '@nestjs/common';
import { HotelsController } from './hotels.controller';
import { HotelsService } from './hotels.service';
import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.example'] }),
    DatabaseModule,
  ],
  controllers: [HotelsController],
  providers: [HotelsService],
})
export class HotelsModule {}
