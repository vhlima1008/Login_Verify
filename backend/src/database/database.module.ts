import { Module } from '@nestjs/common';
import { SupabaseProvider } from './supabase.provider';

@Module({
  providers: [SupabaseProvider],
  exports:   [SupabaseProvider],   // <- precisa exportar
})
export class DatabaseModule {}
