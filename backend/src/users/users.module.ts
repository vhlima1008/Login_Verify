import { Module } from '@nestjs/common';
import { UsersRepository } from './users.repository/users.repository';
import { DatabaseModule } from '../database/database.module';

@Module({
  imports: [DatabaseModule],      // <- traz o SUPABASE_CLIENT
  providers: [UsersRepository],
  exports: [UsersRepository],     // <- para ser usado no AuthModule
})
export class UsersModule {}
