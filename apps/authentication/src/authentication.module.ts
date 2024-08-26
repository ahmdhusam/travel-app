import { Module } from '@nestjs/common';
import { AuthenticationController } from './authentication.controller';
import { AuthenticationService } from './authentication.service';
import { DatabaseModule } from '@app/database';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: ['.env.example'] }),
    DatabaseModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
