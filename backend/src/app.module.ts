import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Carrega .env e fica global
    ConfigModule.forRoot({ isGlobal: true }),

    DatabaseModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
