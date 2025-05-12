import { Inject, Injectable } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class UsersRepository {
    constructor(@Inject('SUPABASE_CLIENT') private db: SupabaseClient) {}

    async findByEmail(email: string){
        const {data,error} = await this.db
        .from('users')
        .select('*')
        .eq('email',email)
        .single();
        if (error) return null;
        return data;
    }

    async create(email: string, hash: string){
        const {data,error} = await this.db
        .from('users')
        .insert({email,hash})
        .select()
        .single();
        if(error) throw new Error(error.message);
        return data;
    }
}
