import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService) {
        return {
          dialect: 'postgres',
          host: configService.getOrThrow('DATABASE_HOST'),
          port: parseInt(configService.getOrThrow('DATABASE_PORT')),
          username: configService.getOrThrow('DATABASE_USERNAME'),
          password: configService.getOrThrow('DATABASE_PASSWORD'),
          database: configService.getOrThrow('DATABASE_NAME'),
          autoLoadModels: true,
          synchronize: configService.getOrThrow('NODE_ENV') !== 'production',
        };
      },
    }),
  ],
})
export class DatabaseModule {}
