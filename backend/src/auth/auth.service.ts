import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersRepository } from 'src/users/users.repository/users.repository';

@Injectable()
export class AuthService {
    constructor(
        private usersRepo: UsersRepository,
        private jwt: JwtService,
    ) {}

    async register(email: string, password: string){
        const hash = await bcrypt.hash(password,Number(process.env.BCRYPT_SALT));
        const user = await this.usersRepo.create(email, hash);
        return this.token(user);
    }

    async login(email: string, password: string){
        const user = await this.usersRepo.findByEmail(email);
        const ok = user && await bcrypt.compare(password, user.hash);
        if (!ok) throw new UnauthorizedException('Credenciais Inválidas.');
        return this.token(user);
    }

    private token(user: any){
        const payload = {sub: user.id, email: user.email};
        return {access_token: this.jwt.sign(payload)};
    }
}
