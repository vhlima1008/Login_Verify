import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { ConfigService } from '@nestjs/config';

export const SupabaseProvider = {
  provide: 'SUPABASE_CLIENT',
  inject: [ConfigService],                // injeta o serviço
  useFactory: (config: ConfigService): SupabaseClient => {
    const url = config.get<string>('SUPABASE_URL');
    const key = config.get<string>('SUPABASE_SERVICE_KEY');

    if (!url || !key) {
      throw new Error('Variáveis SUPABASE_URL ou SUPABASE_SERVICE_KEY ausentes');
    }

    return createClient(url, key, { auth: { persistSession: false } });
  },
};
