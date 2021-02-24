import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './repository/User.repository';
import { UserOrmEntity } from './entities/User.orm-entity';
import { UserRegisterController, UserRegisterService } from './features/user-register';
import { UserLoginController, UserLoginService } from './features/user-login';

@Module({
    imports: [TypeOrmModule.forFeature([UserOrmEntity])],
    controllers: [UserRegisterController, UserLoginController],
    providers: [UserRepository, UserRegisterService, UserLoginService],
    exports: []
})
export class UserModule {
}