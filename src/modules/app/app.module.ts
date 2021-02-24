import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/User.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'mongodb',
            url: process.env.MONGODB_URI,
            useNewUrlParser: true,
            synchronize: true,
            useUnifiedTopology: true,
            ssl: true,
            authSource: 'admin',
            entities: ["dist/**/**.orm-entity{.ts,.js}"]
        }),
        EventEmitterModule.forRoot(),
        UserModule
    ]
})
export class AppModule {
}
